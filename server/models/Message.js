const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Admins included in User collection
  message: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
  reactions: [
    {
      emoji: String, // Reaction emoji
      userId: String, // ID of the user who reacted
    },
  ],
  fileName: { type: String, default: null }, // Name of the uploaded file
  filePath: { type: String, default: null }, // Path where the file is stored locally
  fileType: { type: String, default: null }, // MIME type of the file (e.g., image/png, application/pdf)
});

module.exports = mongoose.model("Message", MessageSchema);
