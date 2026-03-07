const connectDB = require("./_lib/db");

module.exports = async function handler(_req, res) {
  let mongoReady = false;
  try {
    mongoReady = await connectDB();
  } catch (_error) {
    mongoReady = false;
  }
  return res.status(200).json({ ok: true, mongoReady });
};
