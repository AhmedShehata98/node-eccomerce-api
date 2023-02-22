const router = require("express").Router();
const {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
} = require("../controller/brand.controller");

router
  .get("/", getBrands)
  .get("/:id", getBrandById)
  .post("/", createBrand)
  .put("/:id", updateBrand)
  .delete("/:id", deleteBrand);
module.exports = router;
