const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");

const express = require("express");
const { param } = require("express-validator");
const {
  validateCreateCategory,
  vaidateUpdateCategory,
} = require("../validator/category.validator");
const router = express.Router();

router.get("/", getCategories);
router.get("/:id", param("id").isMongoId(), getCategory);
router.post("/", validateCreateCategory, createCategory);
router.put("/:id", vaidateUpdateCategory, updateCategory);
router.delete("/:id", param("id").isMongoId(), deleteCategory);

module.exports = router;
