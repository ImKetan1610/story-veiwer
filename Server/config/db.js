const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load environment from .env file
dotenv.config();

// make connection to mongodb
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // has no effect since Node.js Driver version 4.0.0
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("Database is connected successfully ✔");
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

// need to export the connection function so that we can initialize it to the required location
module.exports = connectToDB;
