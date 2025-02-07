const Shipment = require('../models/Shipment');
const AggregatedLoad = require('../models/AggregatedLoad');
const Provider = require('../models/Provider');
const NotificationService = require('./NotificationService');

class LogisticsService {
  async aggregateShipments(shipments) {
    try {
      const groupedShipments = this.groupShipmentsByCityAndState(shipments);
      const aggregatedLoads = [];

      for (const group of Object.values(groupedShipments)) {
        if (group.length > 1 && await this.canAggregateShipments(group)) {
          const aggregatedLoad = await this.createAggregatedLoad(group);

          aggregatedLoads.push(aggregatedLoad);

          // Notify all shipments in the aggregated group
          for (const shipment of group) {
            await NotificationService.notifyShipmentStatus(shipment, 'aggregated');
          }
        }
      }

      return aggregatedLoads;
    } catch (error) {
      throw error;
    }
  }

  // Groups shipments by city and state of origin and destination
  groupShipmentsByCityAndState(shipments) {
    const groups = {};

    shipments.forEach(shipment => {
      const originKey = `${shipment.origin.cityState}`;
      const destinationKey = `${shipment.destination.cityState}`;
      const regionKey = `${originKey}_${destinationKey}`;

      if (!groups[regionKey]) groups[regionKey] = [];
      groups[regionKey].push(shipment);
    });

    return groups;
  }

  async canAggregateShipments(shipments) {
    const totalWeight = shipments.reduce((sum, s) => sum + (s.totalWeight || 0), 0);
    const totalVolume = shipments.reduce((sum, s) => sum + (s.totalVolume || 0), 0);

    if (totalWeight === 0 || totalVolume === 0) return false;

    const availableProvider = await Provider.findOne({
      'vehicles.capacity.weight': { $gte: totalWeight },
      'vehicles.capacity.volume': { $gte: totalVolume }
    });

    return !!availableProvider;
  }

  async createAggregatedLoad(shipments) {
    const totalWeight = shipments.reduce((sum, s) => sum + (s.totalWeight || 0), 0);
    const totalVolume = shipments.reduce((sum, s) => sum + (s.totalVolume || 0), 0);

    const origin = shipments[0].origin;
    const destination = shipments[0].destination;

    const aggregatedLoad = new AggregatedLoad({
      origin,
      destination,
      totalWeight,
      totalVolume,
      count: shipments.length,
      shipments: shipments.map(s => s._id)
    });

    await aggregatedLoad.save();

    return aggregatedLoad;
  }
}

module.exports = new LogisticsService();
