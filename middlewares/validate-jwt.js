const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Middleware that validates the JWT token
const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  // Check is the token was provided
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  try {
    // get the uid from the token
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(uid);

    // check if the token belongs to an user
    if (!user) {
      return res.status(404).json({
        msg: "Error validating token - The user not found",
      });
    }

    // check if the user that belongs to the token is active
    if (!user.status) {
      return res.status(401).json({
        msg: "Error validating token - User is not active",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // if the token is not valid we return the next message
    return res.status(500).json({
      msg: "Error validating token",
    });
  }
};

module.exports = {
  validateJWT,
};
