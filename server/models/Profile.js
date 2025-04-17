const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Profile name
  age: { type: Number, required: true }, // Age of the person
  bio: { type: String, required: true }, // Short biography
  profileImage: { type: String, required: true }, // Profile picture URL
  interests: [{ type: String }], // Array of interests or hobbies
  skills: [{ type: String }], // Array of skills
  contactInfo: { type: String }, // Contact information
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

module.exports = mongoose.model('Profile', profileSchema);
