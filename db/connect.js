const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
