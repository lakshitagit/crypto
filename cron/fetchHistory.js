// cron/fetchHistory.js
const cron = require('node-cron');
const axios = require('axios');
const CurrentCoin = require('../models/CurrentCoin'); 
const HistoryCoin = require('../models/HistoryCoin');

const fetchAndStoreHistory = async () => {
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
    console.log(" CurrentCoin collection updated.");

    const history = new HistoryCoin({ coins: data });
    await history.save();
    console.log(" History saved at:", new Date().toLocaleString());
  } catch (error) {
    console.error(" Cron job failed:", error.message);
  }
};



//  For testing, run every minute:
// cron.schedule('* * * * *', fetchAndStoreHistory);

// For production, run every hour:
cron.schedule('0 * * * *', fetchAndStoreHistory);
