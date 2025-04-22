const mongoose = require('mongoose');

const tattooProfileSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Profile name
  bio: { type: String, required: true }, // Short biography
  profileImage: { type: String, required: true }, // Profile picture URL
  popularity: { type: Number, min: 0, max: 10 }, // Popularity rating
  interests: [{ type: String }], // Personal interests
  skills: [{ type: String }], // General skills or tattoo-related expertise
  contactInfo: { type: String }, // Contact information
  experience: { type: String }, // Years of experience or work history
  tattooStyles: [{ type: String }], // Tattoo styles the artist specializes in
  portfolio: [{ type: String }], // URLs to portfolio images of their work
  certifications: [{ type: String }], // Certifications or professional licenses
  tags: [{ type: String }], // Keywords describing the profile (e.g., "Bold," "Minimalist")
  socialMediaLinks: {
    tiktok: { type: String }, // TikTok profile URL
    instagram: { type: String }, // Instagram profile URL
    facebook: { type: String }, // Facebook profile URL
    x: { type: String }, // X (formerly Twitter) profile URL
  }, // Specific social media profiles
  languagesSpoken: [{ type: String }], // Languages the artist can communicate in
  availability: { type: String }, // Availability for appointments or bookings
  pricing: { type: String }, // Pricing details (e.g., hourly rates)
  safetyProtocols: { type: String }, // Hygiene and safety practices followed
  awards: [{ type: String }], // Awards or recognitions received
  artwork: [{ type: String }], // URLs to additional artwork or designs
  origin: {
    city: { type: String }, // City where the artist is based
    country: { type: String }, // Country where the artist is based
  }, // Section detailing the artist's location or origin
  createdAt: { type: Date, default: Date.now }, // Timestamp for profile creation
});



module.exports = mongoose.model('TattooProfile', tattooProfileSchema);

