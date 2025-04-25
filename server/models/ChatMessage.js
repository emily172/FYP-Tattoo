const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Sender's name or identifier
  content: { type: String, required: true }, // Message content
  timestamp: { type: Date, default: Date.now }, // Timestamp of the message
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
