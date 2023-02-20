const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

exports.connectDB = async (URI) => {
  try {
    const { connection } = await mongoose.connect(URI);
    console.log(`connected success to DB Host : ${connection.host}`);
  } catch (error) {
    console.log(`failed to connect to DB Error is : ${error.message}`);
  }
};

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "category name is required field !"],
    min: 3,
    max: 35,
    unique: true,
  },
  slug: {
    type: String,
    required: [true, "category slug is required field !"],
    min: 3,
    max: 35,
    unique: true,
  },
  image: {
    type: String,
    required: [true, "category image is required field !"],
  },
});

exports.Category = mongoose.model("category", categorySchema);
