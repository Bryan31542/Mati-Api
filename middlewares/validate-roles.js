const { response, request } = require("express");

// Middleware to validate is the user is an admin
const isAdmin = (req = request, res = response, next) => {
  // Is there is no token we return an error
  if (!req.user) {
    return res.status(500).json({
      msg: "Trying to verify admin role without token",
    });
  }

  // we get the role an name of the user from the request
  const { role, name } = req.user;

  // if the role is not ADMIN_ROLE we return an error
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not an admin`,
    });
  }
  next();
};

// Middleware to validate is the user has a specific role, the array of roles is passed as a parameter
const hasRole = (...roles) => {
  return (req, res = response, next) => {
    // check is there is a token
    if (!req.user) {
      return res.status(500).json({
        msg: "Trying to verify admin role without token",
      });
    }

    // if the role of the user is not included in the array of roles we return an error
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `Roles required ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdmin,
  hasRole,
};
