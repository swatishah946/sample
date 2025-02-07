const mongoose = require('mongoose');

const aggregatedLoadSchema = new mongoose.Schema({
  origin: {
    companyName: String,
    cityState: String,
    zipCode: String,
  },
  destination: {
    companyName: String,
    cityState: String,
    zipCode: String,
  },
  totalWeight: Number,
  totalVolume: Number,
  count: Number,
  optimizedRoute: [String]
});

module.exports = mongoose.model('AggregatedLoad', aggregatedLoadSchema);
