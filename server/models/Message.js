const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Admins included in User collection
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
reactions: [
  {
    emoji: String, // Reaction emoji
    userId: String, // ID of the user who reacted
  },
],
});

module.exports = mongoose.model('Message', MessageSchema);
