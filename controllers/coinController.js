const axios = require('axios');
const CurrentCoin = require('../models/CurrentCoin');
const HistoryCoin = require('../models/HistoryCoin');


exports.getLiveCoins = async (req, res) => {
  try {
    const data = await CurrentCoin.find({});
    console.log(" /api/coins called — coins fetched:", data.length);
    res.json(data);
  } catch (error) {
    console.error("Error in /api/coins:", error.message);
    res.status(500).json({ message: "Failed to fetch coins" });
  }
};


// POST /api/history
exports.saveHistory = async (req, res) => {
  try {
    const coins = await CurrentCoin.find({});
    const history = new HistoryCoin({ coins });
    await history.save();

    res.json({ message: 'History saved', timestamp: history.timestamp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET /api/history/:coinId
exports.getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await HistoryCoin.find({}, { coins: { $elemMatch: { id: coinId } }, timestamp: 1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.triggerCronFetch = async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: true,
          price_change_percentage: '1h,24h,7d',
        },
      }
    );

    await CurrentCoin.deleteMany({});
    await CurrentCoin.insertMany(data);

    const history = new HistoryCoin({ coins: data });
    await history.save();

    res.json({ message: 'Data fetched & saved', count: data.length });
  } catch (error) {
    console.error(" Manual Cron Failed:", error.message);
    res.status(500).json({ message: "Manual fetch failed", error: error.message });
  }
};
