const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectedRoute = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from headers
      token = req.header.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.SECRETE_PASSKEY);

      // attach the user to the requests
      // The '-' sign in front of password tells Mongoose to exclude this field.
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).send({ message: "Not Authorized" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "User is not authorized for this task." });
  }
};

module.exports = { protectedRoute };
