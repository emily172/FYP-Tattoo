const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Unanswered' }, 
  softDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Contact', contactSchema);
