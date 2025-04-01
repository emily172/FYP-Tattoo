const express = require("express");
const Admin = require("../models/Admin");

const router = express.Router();

// REGISTER ADMIN
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully!", admin });
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
