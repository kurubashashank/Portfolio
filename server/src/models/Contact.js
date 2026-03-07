const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 2000 },
    preferredChannel: {
      type: String,
      enum: ["whatsapp", "linkedin", "gmail"],
      default: "whatsapp",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
