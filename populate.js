require("dotenv").config();

const connectDB = require("./db/connect");
const Products = require("./models/product");
const productsJson = require("./products.json");

const connecter = async () => {
  try {
    await connectDB(process.env.DB_URL);
    console.log("Connected");
    await Products.deleteMany();
    await Products.create(productsJson);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connecter();
