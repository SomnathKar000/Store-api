const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({ price: { $lt: 90, $gt: 30 } })
    .select("name price")
    .sort("price");
  res.status(200).json({ totalResults: products.length, products });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const searchQuery = {};
  if (featured) {
    searchQuery.featured = featured === "true" ? true : false;
  }
  if (company) {
    searchQuery.company = company;
  }
  if (name) {
    searchQuery.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    console.log(numericFilters);
  }
  let result = Products.find(searchQuery);
  if (sort) {
    let sortvalue = sort.split(",").join(" ");
    result = result.sort(sortvalue);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    let fieldsvalue = fields.split(",").join(" ");
    result = result.select(fieldsvalue);
  }
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  result = result.limit(limit).skip(skip);
  const products = await result;
  return res.status(200).json({ totalResults: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
