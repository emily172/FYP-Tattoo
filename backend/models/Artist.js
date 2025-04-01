//Updated the Artists Schema

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Artists can have secure login
}, { timestamps: true });

// Hash password before saving
ArtistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare hashed password for login
ArtistSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Artist", ArtistSchema);

