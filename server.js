const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const coinRoutes = require('./routes/coinRoutes');

dotenv.config();
const app = express();

app.use(cors({
     origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials:true, //allow frontend to send the cookies
}));
app.use(express.json());



app.use('/api', coinRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );


    require('./cron/fetchHistory');
  })
  .catch(err => console.error(err));
