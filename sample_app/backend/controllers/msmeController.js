const Shipment = require('../models/Shipment');
const AggregatedLoad = require('../models/AggregatedLoad');
const LogisticsService = require('../services/LogisticsService');

/**
 * Create a new shipment and check aggregation opportunities.
 */
exports.createShipment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const shipment = new Shipment({
      ...req.body,
      msmeId: req.user._id
    });

    await shipment.save();

    // Aggregation logic for pending shipments
    const pendingShipments = await Shipment.find({ status: 'pending', aggregated: false });

    if (pendingShipments.length >= 3) {
      await aggregateShipments(pendingShipments);
    }

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Aggregates shipments based on common criteria and assigns providers.
 */
async function aggregateShipments(shipments) {
  try {
    const aggregationGroups = await Shipment.aggregate([
      {
        $match: {
          status: 'pending',
          aggregated: false
        }
      },
      {
        $group: {
          _id: {
            origin: "$origin.cityState",
            destination: "$destination.cityState"
          },
          shipments: { $push: "$$ROOT" },
          totalWeight: { $sum: "$totalWeight" },
          totalVolume: { $sum: "$totalVolume" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gte: 3 }, // Minimum shipment count to form a group
          totalWeight: { $lte: 5000 } // Example weight limit for efficiency
        }
      }
    ]);

    for (const group of aggregationGroups) {
      const aggregatedLoad = new AggregatedLoad({
        origin: group._id.origin,
        destination: group._id.destination,
        shipments: group.shipments.map(s => s._id),
        totalWeight: group.totalWeight,
        totalVolume: group.totalVolume,
        count: group.count,
        status: 'aggregated'
      });

      await aggregatedLoad.save();

      // Update shipments as aggregated
      await Shipment.updateMany(
        { _id: { $in: group.shipments.map(s => s._id) } },
        { $set: { aggregated: true } }
      );

      // Notify provider if available
      const bestProvider = await LogisticsService.findBestProvider(aggregatedLoad);
      if (bestProvider) {
        aggregatedLoad.assignedProvider = bestProvider._id;
        await aggregatedLoad.save();
        NotificationService.notifyProvider(bestProvider, aggregatedLoad);
      }
    }
  } catch (error) {
    console.error("Error during aggregation:", error);
  }
}

exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .populate('aggregationGroup')
      .populate('matchedProvider');

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShipmentTracking = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate('trackingUpdates');

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json(shipment.trackingUpdates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.aggregateShipments = async (req, res) => {
  try {
    const aggregationCriteria = [
      {
        $match: {
          status: 'pending',
          aggregated: false
        }
      },
      {
        $group: {
          _id: { origin: "$origin", destination: "$destination" },
          totalWeight: { $sum: "$totalWeight" },
          totalVolume: { $sum: "$totalVolume" },
          shipmentIds: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gte: 3 } // Aggregate only when there are 3 or more shipments
        }
      }
    ];

    const aggregatedLoads = await Shipment.aggregate(aggregationCriteria);

    if (!aggregatedLoads.length) {
      return res.status(200).json({ message: "No suitable shipments for aggregation" });
    }

    for (const load of aggregatedLoads) {
      // Update aggregated shipments in the database
      await Shipment.updateMany(
        { _id: { $in: load.shipmentIds } },
        { $set: { aggregated: true, aggregationGroup: load._id } }
      );
    }

    res.status(200).json({
      message: "Aggregation successful",
      data: aggregatedLoads
    });
  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchedShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ aggregated: true })
      .populate('aggregationGroup')
      .populate('matchedProvider');

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignProviderToLoad = async (req, res) => {
  try {
    const { aggregatedLoadId } = req.body;

    const aggregatedLoad = await AggregatedLoad.findById(aggregatedLoadId);
    if (!aggregatedLoad) {
      return res.status(404).json({ message: "Aggregated load not found" });
    }

    const bestProvider = await LogisticsService.findBestProvider(aggregatedLoad);
    if (!bestProvider) {
      return res.status(400).json({ message: "No suitable provider found" });
    }

    aggregatedLoad.assignedProvider = bestProvider._id;
    await aggregatedLoad.save();

    res.json({ message: "Provider assigned successfully", provider: bestProvider });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
