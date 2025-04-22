const mongoose = require('mongoose');

// Define the TattooImage schema
const tattooImageSchema = new mongoose.Schema({
  artistName: { type: String, required: true }, // Name of the tattoo artist
  style: { type: String, required: true }, // Style of the tattoo (e.g., traditional, realism, etc.)
  imageURL: { type: String, required: true }, // URL for the tattoo image
  description: { type: String }, // Description or details about the tattoo
  tags: { type: [String] }, // Tags for categorization (e.g., "blackwork", "floral")
  dimensions: { type: String }, // Dimensions of the tattoo image
  locationOnBody: { type: String }, // Body location where the tattoo is placed
  dateUploaded: { type: Date, default: Date.now }, // Date when the image was uploaded
  artistWebsite: { type: String }, // Optional link to the artist's website or portfolio
});

module.exports = mongoose.model('TattooImage', tattooImageSchema);
