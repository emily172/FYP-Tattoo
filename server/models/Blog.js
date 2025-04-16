// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, default: 'General' },
  tags: [String], // Array of tags
  image: { type: String }, // URL for the blog's main image
});

module.exports = mongoose.model('Blog', blogSchema);
