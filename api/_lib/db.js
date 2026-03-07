const mongoose = require("mongoose");

let cached = global.__mongooseCache;

if (!cached) {
  cached = global.__mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return false;
  }

  if (cached.conn) {
    return true;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { autoIndex: true })
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
    return true;
  } catch (_error) {
    cached.promise = null;
    cached.conn = null;
    return false;
  }
}

module.exports = connectDB;
