const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "product title is required field"],
    unique: [true, "product title must be unique"],
    minLength: [10, "product title is too small"],
    maxLength: [50, "product title is too long"],
    lowerCase: true,
  },
  description: {
    type: String,
    required: [true, "product description is required field"],
    unique: [true, "product description must be unique"],
    minLength: [20, "product description is too small"],
    maxLength: [85, "product description is too long"],
    lowerCase: true,
  },
  imageThumbnail: {
    type: String,
    required: [true, "product thumbnail is required field"],
    unique: [true, "product description must be unique"],
  },
  images: {
    type: [String],
    minLength: [2, "product images must be 2 or more"],
    maxLength: [6, "product images must be lower than 6 or equals"],
    required: [
      true,
      "product images must be 2 images at least in array format",
    ],
  },
  price: {
    type: Number,
    min: [1, "product price should not be less than 1 or equals"],
    max: [9, "It should not be more than 9 or equals"],
    required: [true, "product price is required field"],
  },
  priceAfterDiscount: {
    type: Number,
    min: [1, "product price should not be less than 1 or equals"],
    max: [9, "It should not be more than 9 or equals"],
  },
  colors: {
    type: [String],
    require: [true, "must be colors for this product"],
    minLength: [1, "product price should not be less than 1 or equals"],
    maxLength: [8, "It should not be more than 8 or equals"],
  },
  brand: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "brands",
    required: [true, "product brand name is required"],
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "categorys",
  },
  rating: {
    type: Number,
    min: [1, "product rating should not be less than 1 stars"],
    max: [5, "product rating should not be more than 5 stars"],
    default: 0,
  },
  quantity: {
    type: Number,
    required: [true, "product quantity is required field"],
    min: [1, "product price should not be less than 1 or equals"],
    max: [9_000_000, "It should not be more than 9_000_000 or equals"],
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
