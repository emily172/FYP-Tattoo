const mongoose = require("mongoose");

const PinnedSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Contact's email
  name: { type: String, required: true },               // Contact's name
});

module.exports = mongoose.model("Pinned", PinnedSchema);
