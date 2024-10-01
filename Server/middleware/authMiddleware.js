const jwt = require("jsonwebtoken");
require("dotenv").config();

const protectedRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  } else {
    // Fallback to token from cookies if Authorization header is not present
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      req.user = null;
      return res.status(403).json("The provided token is not valid");
    } else {
      req.user = user;
    }
    next();
  });
};

module.exports = { protectedRoute };
