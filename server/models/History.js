const mongoose = require('mongoose');

// Define the History schema
const historySchema = new mongoose.Schema({
  year: { type: String, required: true }, // Year of the milestone
  event: { type: String, required: true }, // Description of the milestone/event
  image: { type: String }, // URL for an image
  video: { type: String }, // URL for a video
  testimonial: { type: String }, // Testimonial or quote
  link: { type: String }, // Additional link for detailed info
});

module.exports = mongoose.model('History', historySchema);