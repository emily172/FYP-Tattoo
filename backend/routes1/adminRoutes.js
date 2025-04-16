/*const express = require("express");
const Admin = require("../models/Admin");

const router = express.Router();

//Manually hashing the password before saving them - prevents email duplicaton
const bcrypt = require("bcryptjs");

// REGISTER ADMIN
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const adminExists = await Admin.findOne({ email });
      if (adminExists) {
        return res.status(400).json({ message: "Admin email already in use" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({ name, email, password: hashedPassword });
  
      await admin.save();
      res.status(201).json({ message: "Admin created successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      res.json({ message: "Admin login successful!", admin });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  

// GET ALL ADMINS (For testing)
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// UPDATE ADMIN
router.put("/:id", async (req, res) => {
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.json({ message: "Admin updated successfully!", updatedAdmin });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// DELETE ADMIN
  router.delete("/:id", async (req, res) => {
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
  
      if (!deletedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.json({ message: "Admin deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

module.exports = router;
*/