const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  specialty: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Artist", ArtistSchema);
