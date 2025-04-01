const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create a new user (Register)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (for testing)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Updating the users to change content
router.put("/:id", async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, // Get user ID from request
        req.body,      // Update fields from request body
        { new: true, runValidators: true } // Return updated user & validate input
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User updated successfully!", updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
//Creating a Delete route to delete all of the users
  router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
