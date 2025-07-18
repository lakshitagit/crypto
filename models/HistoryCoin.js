const mongoose = require('mongoose');

const HistoryCoinSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  coins: [Object],
});



module.exports = mongoose.model('HistoryCoin', HistoryCoinSchema);

