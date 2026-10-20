const express = require('express');
const connectDB = require('./config/db.js');

const dotenv = require('dotenv');
dotenv.config();

const app = express();



app.use(express.json());




const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
};

startServer();