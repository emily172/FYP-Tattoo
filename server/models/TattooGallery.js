const mongoose = require('mongoose');

const tattooGallerySchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title for the tattoo image
    imageUrl: { type: String, required: true }, // URL for the tattoo image
    description: { type: String }, // Description of the tattoo
    tattooStyle: { type: String }, // Style of the tattoo (e.g., realism, traditional)
    bodyLocation: { type: String }, // Location on the body (e.g., arm, back)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }, // Reference to the profile/artist who created it
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  });
  
  module.exports = mongoose.model('TattooGallery', tattooGallerySchema);
  