const mongoose = require('mongoose');

// Define FAQ Schema
const faqSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Category of the FAQ (e.g., Tattoo Preparation)
  question: { type: String, required: true }, // The FAQ question
  answer: { type: String, required: true },   // The FAQ answer
});

// Create and export the model
module.exports = mongoose.model('FAQ', faqSchema);
