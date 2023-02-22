const { body, param, validationResult } = require("express-validator");

exports.validateCreateCategory = (req, res, next) => {
  body("name").isString(), body("image").isString(), param("id").isMongoId();

  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json(error.array());
  }
  next();
};
exports.vaidateUpdateCategory = (req, res, next) => {
  param("id").isMongoId(), body("name").isString(), body("image").isString();

  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json(error.array());
  }
  next();
};
