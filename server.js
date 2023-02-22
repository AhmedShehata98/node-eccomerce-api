const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const { connectDB } = require("./model/category.model");
const categoryRouter = require("./router/category.routes");
const brandsRouter = require("./router/brand.routes");
const { GlobalErrorHandler } = require("./middleware/errorHandling");
dotEnv.config({ path: "./config.env" });

// connect to Database
connectDB(process.env.DB_URI);

app.use(express.json());
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandsRouter);
app.use(
  (error, req, res, next) => {
    const errorShema = new GlobalErrorHandler(error, 500).getErrorObject();

    next(errorShema);
  },
  (err, req, res, next) => {
    res.status(err.statusCode).json(err);
  }
);

app.listen(process.env.PORT, () =>
  console.log(`express app is running on : ${process.env.PORT}`)
);
