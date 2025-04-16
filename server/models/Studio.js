const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }, // Studio phone number
  email: { type: String, required: true }, // Studio email address
  hours: { 
    type: Object, 
    default: { Monday: "10:00 AM - 8:00 PM", Saturday: "11:00 AM - 6:00 PM" } 
  },
  services: [String], // List of services offered
  team: [
    {
      name: { type: String },
      role: { type: String },
      image: { type: String }
    }
  ],
  testimonials: [
    {
      author: { type: String },
      text: { type: String }
    }
  ],
  image: { type: String }, // Studio overview image
  events: [
    {
      name: { type: String },
      date: { type: String },
      time: { type: String },
      location: { type: String },
      description: { type: String }
    }
  ],
  gallery: [
    {
      image: { type: String },
      title: { type: String },
      artist: { type: String }
    }
  ],
  pricing: [
    {
      service: { type: String },
      price: { type: String },
      offer: { type: String }
    }
  ],
  faqs: [
    {
      question: { type: String },
      answer: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Studio', studioSchema);
