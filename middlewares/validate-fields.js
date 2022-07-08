const { validationResult } = require("express-validator");

// Middleware that validates the fields of the request and return an array of errors is there are any
const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validateFields,
};
