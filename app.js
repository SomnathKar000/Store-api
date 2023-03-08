const express = require("express");
const connectDB = require("./db/connect");
const errMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const routes = require("./routes/products");

require("dotenv").config();
require("express-async-errors");
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Store api</h1><a href='/api/v1/products'>Products route</a>");
});
// Products routes
app.use("/api/v1/products", routes);

// Error middleware
app.use(errMiddleware);
app.use(notFoundMiddleware);

const starter = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
starter();
