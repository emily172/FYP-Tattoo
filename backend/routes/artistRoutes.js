const express = require("express");
const Artist = require("../models/Artist");

const router = express.Router();


//Manually hashing the password before saving them - prevents email duplicaton
const bcrypt = require("bcryptjs");

// CREATE ARTIST - updated with new field
router.post("/register", async (req, res) => {
  try {
    const { name, bio, specialty, email, password } = req.body;
    
    const artistExists = await Artist.findOne({ email });
    if (artistExists) {
      return res.status(400).json({ message: "Artist email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const artist = new Artist({ name, bio, specialty, email, password: hashedPassword });

    await artist.save();
    res.status(201).json({ message: "Artist registered successfully!", artist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const artist = await Artist.findOne({ email });
    if (!artist || !(await artist.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful!", artist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET ALL ARTISTS
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE ARTIST
router.put("/:id", async (req, res) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtist) return res.status(404).json({ message: "Artist not found" });

    res.json({ message: "Artist updated successfully!", updatedArtist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE ARTIST
router.delete("/:id", async (req, res) => {
  try {
    await Artist.findByIdAndDelete(req.params.id);
    res.json({ message: "Artist deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;