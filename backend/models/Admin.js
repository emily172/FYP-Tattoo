const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Link to User model
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },  // Link to Artist model
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
