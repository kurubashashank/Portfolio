const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return false;
  }

  await mongoose.connect(uri, {
    autoIndex: true
  });
  return true;
}

module.exports = connectDB;
