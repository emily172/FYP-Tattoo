/*const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// CREATE A BOOKING
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET BOOKINGS FOR A USER
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE A BOOKING
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking updated successfully!", updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE A BOOKING
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
*/