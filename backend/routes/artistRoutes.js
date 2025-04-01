const express = require("express");
const Artist = require("../models/Artist");

const router = express.Router();

// CREATE ARTIST
router.post("/", async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json({ message: "Artist added successfully!", artist });
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
