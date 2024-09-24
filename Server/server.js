const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectToDB = require("./config/db");
const userRoute = require("./routes/userRoutes");
const storyRoute = require("./routes/storyRoutes");

// Load environment variable from .env file
dotenv.config();

// Initialize an app instance using express
const app = express();

// initialize global middleware
// enable cors
app.use(cors());
// parse JSON bodies
app.use(express.json());
// log requests to console
app.use(morgan("dev"));

// connect to mongodb by calling the function
connectToDB();

// routes
// app.get("/", (req, res) => {
//   res.send("Welcome to the story viewing platform..!!!");
// });

// User Route
app.use("/api/v1/users", userRoute);

// Story Route
app.use("/api/v1/stories", storyRoute);

// Need to import the PORT
const Port_num = process.env.PORT || 3000;

// listening to app on port 
app.listen(Port_num, () => {
  console.log(`server is running on port ${Port_num}`);
});
