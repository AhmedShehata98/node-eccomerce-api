const slugify = require("slugify");
const { Category } = require("../model/category.model");

// @desc get all categories
// @mrouter GET /api/v1/categories
// @access public
exports.getCategories = async (_, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 8;
  const skip = (page - 1) * limit;
  try {
    const categories = await Category.find({}).limit(limit).skip(skip);
    res.status(200).json({ status: true, data: categories });
  } catch (error) {
    res.status(204).send({
      status: false,
      error: error.message,
      message: "no categories here",
      data: [],
    });
  }
};

// @desc get category by id
// @mrouter GET /api/v1/categories/:id
// @access public
exports.getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    res.status(200).json({ status: true, data: category });
  } catch (error) {
    res.status(404).json({
      state: false,
      message: `there's no category available with this id :${id}`,
      error: error.message,
    });
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
    res.status(400).send({
      status: false,
      message: "i can't create this",
      data: err.message,
    });
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
    res.status(404).json({
      status: false,
      message: `cant find category with id : ${id}`,
      error: error.message,
      data: [],
    });
  }
};

// @desc delete category by id
// @route DELETE /api/v1/categories/:id
// @ accsss private
exports.deleteCategory = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id, { new: true });
    req.status(200).json({ status: true, data: deletedCategory });
  } catch (error) {
    req.status(404).json({
      status: false,
      error: error.message,
      message: `cant find category with this id : ${id}`,
      data: [],
    });
  }
};
