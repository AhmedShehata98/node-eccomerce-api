const slugify = require("slugify");
const GlobalErrorHandler = require("../middleware/errorHandling");
const { Category } = require("../model/category.model");

// @desc get all categories
// @mrouter GET /api/v1/categories
// @access public
exports.getCategories = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 8;
  const skip = (page - 1) * limit;
  try {
    const categories = await Category.find({}).limit(limit).skip(skip);
    res
      .status(200)
      .json({ status: true, length: categories?.length, data: categories });
    return;
  } catch (error) {
    const errorSchema = new GlobalErrorHandler(
      "there is no categories here",
      400
    ).getErrorObject();
    res.status(errorSchema.statusCode).json(errorSchema);
    return;
  }
};

// @desc get category by id
// @mrouter GET /api/v1/categories/:id
// @access public
exports.getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      const errorShema = new GlobalErrorHandler(
        `no category founded with id : ${id}`,
        404
      );
      res.status(errorShema.statusCode).json(errorShema);
    }
    res.status(200).json({ status: true, data: category });
  } catch (error) {
    const errorShema = new GlobalErrorHandler(
      "id that you are entering is not a valid id format",
      400
    ).getErrorObject();
    res.status(errorShema.statusCode).json(errorShema);
    return;
  }
};

// @desc create a new category
// @mrouter POST /api/v1/categories
// @access private
exports.createCategory = async (req, res) => {
  const name = req.body.name;
  const image = req.body.image;

  try {
    const category = new Category({
      name,
      slug: slugify(name),
      image: image || "empty",
    });
    await category.save();
    res.status(201).send({
      status: true,
      data: category,
    });
  } catch (err) {
    const errorSchema = new GlobalErrorHandler(
      "there is something wrong with body your sent",
      400
    ).getErrorObject();
    res.status(errorSchema.statusCode).json(errorSchema);
  }
};

// @desc find category by id and update
// @route PUT  /api/v1/categories/:id
// @access Private
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name;

  try {
    const newCategory = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json({ status: true, data: newCategory });
  } catch (error) {
    const errorSchema = new GlobalErrorHandler(
      "there is a problem updating maybe your body is invalid",
      400
    ).getErrorObject();
    res.status(errorSchema.statusCode).json(errorSchema);
  }
};

// @desc delete category by id
// @route DELETE /api/v1/categories/:id
// @ accsss private
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id, { new: true });
    return req.status(200).json({ status: true, data: deletedCategory });
  } catch (error) {
    const errorSchema = new GlobalErrorHandler(
      `there was an error deleting not founded id : ${id}`,
      404
    ).getErrorObject();
    res.status(errorSchema.statusCode).json(errorSchema);
    return;
  }
};
