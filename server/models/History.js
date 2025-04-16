const mongoose = require('mongoose');

// Define the History schema
const historySchema = new mongoose.Schema({
  year: { type: String, required: true }, // Year of the milestone
  event: { type: String, required: true }, // Description of the milestone/event
});

module.exports = mongoose.model('History', historySchema);
