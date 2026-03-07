const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Project = require("./models/Project");
const Contact = require("./models/Contact");
const { profile, projects: fallbackProjects } = require("./data/fallbackData");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let mongoReady = false;

app.get("/api/profile", (_req, res) => {
  res.json(profile);
});

app.get("/api/projects", async (_req, res) => {
  try {
    if (mongoReady) {
      const rows = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
      if (rows.length > 0) {
        return res.json(rows);
      }
    }
    return res.json(fallbackProjects);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch projects." });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message, preferredChannel } = req.body || {};
  const allowedChannels = ["whatsapp", "linkedin", "gmail"];
  if (!name || !email || !message || !preferredChannel) {
    return res.status(400).json({ message: "Name, email, message and reply mode are required." });
  }
  if (!allowedChannels.includes(preferredChannel)) {
    return res.status(400).json({ message: "Invalid reply mode selected." });
  }

  try {
    if (mongoReady) {
      await Contact.create({ name, email, message, preferredChannel });
      return res.status(201).json({ message: "Message received. I will get back to you soon." });
    }
    return res.status(202).json({ message: "Portfolio is running in demo mode. Add MongoDB to store messages." });
  } catch (_error) {
    return res.status(500).json({ message: "Unable to submit message right now." });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, mongoReady });
});

async function start() {
  try {
    mongoReady = await connectDB();
    if (mongoReady) {
      const count = await Project.countDocuments();
      if (count === 0) {
        await Project.insertMany(fallbackProjects);
      }
    }
  } catch (_error) {
    mongoReady = false;
  }

  app.listen(port, () => {
    console.log(`API running at http://localhost:${port} | mongoReady=${mongoReady}`);
  });
}

start();
