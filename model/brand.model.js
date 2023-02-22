const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 2,
    maxLength: 12,
    lowercase: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    unique: true,
  },
});

exports.Brand = mongoose.model("brand", brandSchema);
