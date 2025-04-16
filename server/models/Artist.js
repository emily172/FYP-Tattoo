const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String },
  style: { type: String },
});

module.exports = mongoose.model('Artist', artistSchema);



/*const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;*/
