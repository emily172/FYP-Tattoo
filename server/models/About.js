const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  mission: { type: String, required: true },
  story: { type: String, required: true },
  vision: { type: String },
  values: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('About', aboutSchema);
