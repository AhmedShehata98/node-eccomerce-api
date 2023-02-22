const { Brand } = require("../model/brand.model");
const GlobalErrorHandler = require("../middleware/errorHandling");
const { default: slugify } = require("slugify");

// @route  GET /api/v1/brands?page=number&limit=number
// @desc get list of brands
// @accses public
exports.getBrands = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const brands = await Brand.find({}).limit(limit).skip(skip);

    if (brands !== "{}") {
      res
        .status(200)
        .json({ status: true, result: brands?.length, data: brands });
    } else {
      const errSchema = new GlobalErrorHandler(
        "there's no brands yet to show ..",
        404
      ).getErrorObject();
      res.status(404).json(errSchema);
    }
  } catch (error) {
    const errSchema = new GlobalErrorHandler(
      error.message,
      error.statusCode
    ).getErrorObject();
    res.status(errSchema.statusCode).json(errSchema.message);
  }
};

// @route GET /api/v1/brands/:id
exports.getBrandById = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id).limit(limit).skip(skip);
    if (brand) {
      return res
        .status(200)
        .json({ status: true, result: brand?.length || 1, data: brand });
    }
    //
    const errSchema = new GlobalErrorHandler(
      `there's no brands with this id : ${id}`,
      404
    ).getErrorObject();
    return res.status(404).json(errSchema);
  } catch (error) {
    const errSchema = new GlobalErrorHandler(
      error.message,
      error.statusCode
    ).getErrorObject();
    res.status(errSchema.statusCode).json(errSchema);
  }
};

// @route POST /api/v1/brands
// @desc adding new brand {name , image ,slug}
// @accses Private
exports.createBrand = async (req, res) => {
  const { name, image } = req.body;
  try {
    const brand = await new Brand({
      name,
      slug: slugify(name),
      image: image || "empty",
    });
    await brand.save();
    res.status(201).json({ status: true, data: brand });
  } catch (error) {
    const errSchema = new GlobalErrorHandler(
      error.message,
      error.statusCode
    ).getErrorObject();
    res.status(error.statusCode || 409).json(errSchema);
  }
};

// @Route PUT /api/v1/brands/:id
// @Desc getting brand by id and update data
// @Accses Private
exports.updateBrand = async (req, res) => {
  const { name, image } = req.body;
  const { id } = req.params;
  try {
    const newBrand = await Brand.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), image },
      { new: true }
    );
    if (newBrand) {
      return res.status(200).json({ status: true, result: 1, data: newBrand });
    } else {
      const errSchema = new GlobalErrorHandler(
        `there's no brands with id : ${id}`,
        404
      );
      return res.status(404).json(errSchema);
    }
  } catch (error) {
    const errSchema = new GlobalErrorHandler(
      error.message,
      error.statusCode || 400
    ).getErrorObject();
    res.status(errSchema.statusCode, errSchema);
  }
};

// @Route  DELETE /api/v1/brands/:id
// @Desc  delete brand by id
// @Accses Private
exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await Brand.findByIdAndRemove(id, { new: true });
    if (deletedBrand) {
      return res.status(200).json(deletedBrand);
    } else {
      const errSchema = new GlobalErrorHandler(
        `there's no brands with id : ${id}`,
        404
      );
      return res.status(404).json(errSchema);
    }
  } catch (error) {
    const errSchema = new GlobalErrorHandler(
      error.message,
      error.statusCode || 400
    ).getErrorObject();
    res.status(errSchema.statusCode, errSchema);
  }
};
