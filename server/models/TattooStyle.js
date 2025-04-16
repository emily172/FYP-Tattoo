const mongoose = require('mongoose');

const tattooStyleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Style name
  description: { type: String, required: true }, // Description of the style
  image: { type: String, required: true }, // URL for the style image
  createdAt: { type: Date, default: Date.now }, // Automatically set date
});

module.exports = mongoose.model('TattooStyle', tattooStyleSchema);
