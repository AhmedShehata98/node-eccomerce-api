const router = require("express").Router();
const { param } = require("express-validator");
const {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
} = require("../controller/brand.controller");
const {
  validateCreateBrand,
  vaidateUpdateBrand,
} = require("../validator/brand.validator");

router
  .get("/", getBrands)
  .get("/:id", param("id").isMongoId(), getBrandById)
  .post("/", validateCreateBrand, createBrand)
  .put("/:id", vaidateUpdateBrand, updateBrand)
  .delete("/:id", param("id").isMongoId(), deleteBrand);
module.exports = router;
