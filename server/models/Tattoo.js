const mongoose = require('mongoose');

const tattooSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  style: { type: String },
  popularity: { type: Number },
});

module.exports = mongoose.model('Tattoo', tattooSchema);
