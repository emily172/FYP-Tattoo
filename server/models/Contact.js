const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Unanswered' }, // New field for status
  createdAt: { type: Date, default: Date.now },
  softDeleted: { type: Boolean, default: false }, // New field for soft delete
});

module.exports = mongoose.model('Contact', contactSchema);
