const mongoose = require('mongoose');

const tattooSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  style: { type: String },
  popularity: { type: Number },
});

module.exports = mongoose.model('Tattoo', tattooSchema);


/*
const mongoose = require('mongoose');

const tattooSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    style: { type: String, required: true },
  });
  

const Tattoo = mongoose.model('Tattoo', tattooSchema);
module.exports = Tattoo;
*/

/*
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Name or ID of the reviewer
  rating: { type: Number, required: true }, // Rating given (e.g., 1–5 stars)
  comment: { type: String }, // Optional review text
});

const tattooSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  style: { type: String }, // Optional tattoo style
  popularity: { type: Number }, // Optional popularity score
  reviews: [reviewSchema], // Array of reviews
});

module.exports = mongoose.model('Tattoo', tattooSchema);

 */