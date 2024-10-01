const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

//importing routes
const userRoutes = require("./routes/userRoutes.js")
const storyRoutes = require("./routes/storyRoutes.js")
const connectToDB = require("./config/db.js");

//to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const FRONTEND = process.env.FRONTEND;

//database connection
connectToDB();

//middleware so that server can understand json format data
app.use(express.json());

//middleware for path settings
app.use(express.static(path.join(__dirname, "../client/dist")));

//to get cookie we use this middleware
app.use(cookieParser());

//to parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors settings
const corsOptions = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsOptions));

//routes
app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);

//path
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// run server
app.listen(PORT, () => {
  console.log(`Server is up and running on port🚀 ${PORT} `);
});
