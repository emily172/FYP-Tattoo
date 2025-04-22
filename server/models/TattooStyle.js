const mongoose = require('mongoose');

const tattooStyleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tattoo style name
  description: { type: String, required: true }, // Short description
  image: { type: String, required: true }, // Main image
  descriptor: { type: String }, // Detailed description
  images: [{ type: String }], // Array of additional image URLs
  commonLocations: { type: String }, // Suggested body locations for this style
  preparation: { type: String }, // Preparation tips for this tattoo style
  aftercare: { type: String }, // Aftercare instructions
  funFacts: { type: String }, // Fun facts about the tattoo style
  history: { type: String }, // History of the style
  challenges: { type: String }, // Style-specific challenges
  toolsTechniques: { type: String }, // Tools and techniques used
  maintenanceTimeline: { type: String }, // Tattoo maintenance timeline
  iconicDesigns: { type: String }, // Iconic designs within this style
  studioEnvironment: { type: String }, // Environment requirements for tattoo studios
  estimatedDuration: { type: String }, // Time required to complete this tattoo style
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

module.exports = mongoose.model('TattooStyle', tattooStyleSchema);


