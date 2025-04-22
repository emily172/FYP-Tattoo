const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  specialisation: { type: String },
  popularity: { type: Number },
  bio: { type: String },
  contacts: {
    phone: { type: String },
    email: { type: String },
    address: { type: String },
  },
  socialMediaLinks: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  experience: { type: Number },
  certifications: [{ type: String }],
  awards: [{ type: String }], // Simplified to an array of strings
  artwork: [{ type: String }], // Array of strings for artwork references
  portfolioTags: [{ type: String }],
  languagesSpoken: [{ type: String }],
});

module.exports = mongoose.model('Artist', artistSchema);
