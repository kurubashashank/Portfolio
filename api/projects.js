const connectDB = require("./_lib/db");
const Project = require("../server/src/models/Project");
const { projects: fallbackProjects } = require("../server/src/data/fallbackData");

module.exports = async function handler(_req, res) {
  try {
    const mongoReady = await connectDB();
    if (mongoReady) {
      const rows = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
      if (rows.length > 0) {
        return res.status(200).json(rows);
      }
      await Project.insertMany(fallbackProjects);
      const seeded = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
      return res.status(200).json(seeded);
    }
    return res.status(200).json(fallbackProjects);
  } catch (_error) {
    return res.status(500).json({ message: "Failed to fetch projects." });
  }
};
