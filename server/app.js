const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const chalk = require("chalk");

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const brainTreeRouter = require("./routes/braintree");
const orderRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const customizeRouter = require("./routes/customize");

const port = process.env.PORT;
const uri = process.env.URI;

const createFolder = require("./config/upload");

createFolder();

const startServer = () => {
  const server = app.listen(port, () => {
    console.log(chalk.green(`Server is running on http://localhost:${port}/`));
  });

  server.on("error", (error) => {
    console.error(chalk.red("Server failed to start:"), error);
  });
};

const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(chalk.green("DB CONNECTED!"));
  } catch (error) {
    console.error(chalk.red("DB NOT CONNECTED"), error);
    throw error;
  }
};

const init = async () => {
  try {
    await connectToDB();
    startServer();
  } catch (err) {
    console.error(chalk.red("Startup failed."));
    process.exit(1);
  }
};

init();

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", brainTreeRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);
