const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} = require("../controller/category.controller");

const express = require("express");
const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);

module.exports = router;
