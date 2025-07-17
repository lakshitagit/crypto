const mongoose = require('mongoose');

const CurrentCoinSchema = new mongoose.Schema({
  id: String,
  name: String,
  symbol: String,
  current_price: Number,
  market_cap: Number,
  price_change_percentage_24h: Number,
  price_change_percentage_1h_in_currency: Number,
  price_change_percentage_7d_in_currency: Number,
  total_volume: Number,
  market_cap_rank: Number,
  image: String,
  sparkline_in_7d: {
    price: [Number],
  },
  last_updated: Date,
}, { timestamps: true });

module.exports = mongoose.model('CurrentCoin', CurrentCoinSchema);
