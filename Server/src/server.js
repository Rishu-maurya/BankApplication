const dotenv = require('dotenv');
dotenv.config();

const app = require('./app.js');

const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables");
      process.exit(1);
    }
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
};

startServer();