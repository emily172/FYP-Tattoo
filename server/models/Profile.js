const mongoose = require('mongoose');

const tattooProfileSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Profile name
  bio: { type: String, required: true }, // Short biography
  profileImage: { type: String, required: true }, // Profile picture URL
  popularity: { type: Number, min: 0, max: 10 }, // Popularity rating
  interests: [{ type: String }], // Personal interests
  skills: [{ type: String }], // General skills
  contactInfo: { type: String }, // Contact information
  experience: { type: String }, // Years of experience
  tattooStyles: [{ type: String }], // Tattoo styles specialization
  portfolio: [{ type: String }], // URLs to portfolio images
  certifications: [{ type: String }], // Certifications or licenses
  tags: [{ type: String }], // Keywords describing their style
  socialMediaLinks: [{ type: String }], // Social media profile URLs
  availability: { type: String }, // Availability for appointments
  pricing: { type: String }, // Pricing details
  safetyProtocols: { type: String }, // Hygiene and safety practices
  awards: [{ type: String }], // Awards or recognitions
  artwork: [{ type: String }], // URLs for artwork images
  origin: {
    city: { type: String }, // City where the artist is from
    country: { type: String }, // Country where the artist is from
  }, // Section about their origin
  createdAt: { type: Date, default: Date.now }, // Timestamp for profile creation
});

module.exports = mongoose.model('TattooProfile', tattooProfileSchema);

