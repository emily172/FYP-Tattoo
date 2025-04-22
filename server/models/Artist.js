const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  specialisation: { type: String, default: 'Not Specified' },
  popularity: { type: Number, default: 0 },
  bio: { type: String, default: 'No biography available.' },
  contacts: {
    phone: { type: String, default: 'Not Provided' },
    email: { type: String, default: 'Not Provided' },
    address: { type: String, default: 'Not Provided' },
  },
  socialMediaLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  experience: { type: Number, default: 0 },
  certifications: [{ type: String, default: [] }],
  awards: [{ type: String, default: [] }],
  artwork: [{ type: String, default: [] }],
  portfolioTags: [{ type: String, default: [] }],
  languagesSpoken: [{ type: String, default: [] }],
});

module.exports = mongoose.model('Artist', artistSchema);
