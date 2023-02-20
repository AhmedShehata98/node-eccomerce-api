const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const { connectDB } = require("./model/category.model");
const { default: mongoose } = require("mongoose");
const router = require("./router/category.routes");
dotEnv.config({ path: "./config.env" });

// connect to Database
connectDB(process.env.DB_URI);

app.use(express.json());
app.use("/api/v1/categories", router);

app.listen(process.env.PORT, () =>
  console.log(`express app is running on : ${process.env.PORT}`)
);
