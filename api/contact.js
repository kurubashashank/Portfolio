const connectDB = require("./_lib/db");
const Contact = require("../server/src/models/Contact");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { name, email, message, preferredChannel } = req.body || {};
  const allowedChannels = ["whatsapp", "linkedin", "gmail"];

  if (!name || !email || !message || !preferredChannel) {
    return res.status(400).json({ message: "Name, email, message and reply mode are required." });
  }

  if (!allowedChannels.includes(preferredChannel)) {
    return res.status(400).json({ message: "Invalid reply mode selected." });
  }

  try {
    const mongoReady = await connectDB();
    if (mongoReady) {
      await Contact.create({ name, email, message, preferredChannel });
      return res.status(201).json({ message: "Message received. I will get back to you soon." });
    }
    return res.status(202).json({ message: "Portfolio is running in demo mode. Add MongoDB to store messages." });
  } catch (_error) {
    return res.status(500).json({ message: "Unable to submit message right now." });
  }
};
