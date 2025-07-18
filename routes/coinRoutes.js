// routes/coinRoutes.js
const express = require('express');
const router = express.Router();
const {
  getLiveCoins,
  saveHistory,
  getCoinHistory,
  triggerCronFetch
} = require('../controllers/coinController');





router.get('/coins', getLiveCoins);


router.post('/history', saveHistory);


router.get('/history/:coinId', getCoinHistory);
router.get('/cron/fetch-now', triggerCronFetch);
module.exports = router;
