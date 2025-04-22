const mongoose = require('mongoose');

// Define the Image schema
const imageSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title or name of the image
  imageURL: { type: String, required: true }, // URL of the image
  description: { type: String }, // Optional description of the image
  tags: { type: [String] }, // Tags for categorization (e.g., "nature", "artistic")
  uploadDate: { type: Date, default: Date.now }, // Automatically set upload date
  dimensions: { 
    width: { type: Number }, // Width of the image in pixels
    height: { type: Number } // Height of the image in pixels
  },
  author: { 
    name: { type: String }, // Author's name
    website: { type: String } // Author's website (optional)
  },
});

module.exports = mongoose.model('Image', imageSchema);
