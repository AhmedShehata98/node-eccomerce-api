const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const { connectDB } = require("./model/category.model");
const categoryRouter = require("./router/category.routes");
const brandsRouter = require("./router/brand.routes");
const GlobalErrorHandler = require("./middleware/errorHandling");
dotEnv.config({ path: "./config.env" });

// connect to Database
connectDB(process.env.DB_URI);

app.use(express.json());
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandsRouter);
app.use((error, req, res, next) => {
  console.log(error);
  const errorShema = new GlobalErrorHandler(
    error || "there is error with server",
    error.statusCode || 502
  ).getErrorObject();

  if (error) {
    res.status(errorShema.statusCode).json(errorShema);
  }
  next();
});

app.listen(process.env.PORT, () =>
  console.log(`express app is running on : ${process.env.PORT}`)
);
