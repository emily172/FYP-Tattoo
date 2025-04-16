// models/Studio.js
const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  hours: { type: Object, default: { Monday: "10:00 AM - 8:00 PM", Saturday: "11:00 AM - 6:00 PM" } },
  services: [String],
  team: [
    {
      name: { type: String },
      role: { type: String },
      image: { type: String }
    }
  ],
  testimonials: [
    {
      author: { type: String },
      text: { type: String }
    }
  ],
  image: { type: String } // Studio overview image
}, { timestamps: true });

module.exports = mongoose.model('Studio', studioSchema);
