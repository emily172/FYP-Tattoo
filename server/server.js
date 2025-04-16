require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateAdmin = require('./middlewares/authMiddleware'); // Authentication middleware

const Admin = require('./models/Admin'); // Admin model
const Tattoo = require('./models/Tattoo'); // Tattoo model
const Artist = require('./models/Artist'); // Artist model

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Routes

// Admin Registration
app.post('/admin/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ error: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register admin' });
  }
});

// Admin Login
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '6h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Fetch Tattoos
app.get('/tattoos', async (req, res) => {
  const { search, style, popularity, limit } = req.query;
  const filter = {};

  // Add filters based on query parameters
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (style) filter.style = style;
  if (popularity) filter.popularity = parseInt(popularity);

  try {
    const tattoos = await Tattoo.find(filter).limit(parseInt(limit) || 0);
    res.json(tattoos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tattoos' });
  }
});

// Add Tattoo (Protected Route)
app.post('/tattoos', authenticateAdmin, async (req, res) => {
  const { name, image, style, popularity } = req.body;

  try {
    const newTattoo = new Tattoo({ name, image, style, popularity });
    await newTattoo.save();
    res.status(201).json(newTattoo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add tattoo' });
  }
});


app.put('/tattoos/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params; // Extract tattoo ID from the URL
  const { name, image, style, popularity } = req.body; // Extract updated details

  try {
    const updatedTattoo = await Tattoo.findByIdAndUpdate(
      id, // Find tattoo by ID
      { name, image, style, popularity }, // Update the fields
      { new: true } // Return the updated document
    );

    if (!updatedTattoo) {
      return res.status(404).json({ error: 'Tattoo not found' });
    }

    res.status(200).json(updatedTattoo); // Return updated tattoo
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tattoo' });
  }
});


app.delete('/tattoos/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params; // Extract tattoo ID

  try {
    const deletedTattoo = await Tattoo.findByIdAndDelete(id); // Delete by ID

    if (!deletedTattoo) {
      return res.status(404).json({ error: 'Tattoo not found' });
    }

    res.status(200).json({ message: 'Tattoo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tattoo' });
  }
});



// Add Artist (Protected Route)
app.post('/artists', authenticateAdmin, async (req, res) => {
  const { name, bio, avatar, style } = req.body;

  try {
    const newArtist = new Artist({ name, bio, avatar, style });
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add artist' });
  }
});


app.get('/artists', async (req, res) => {
  const { search, style, limit } = req.query; // Extract optional query parameters
  const filter = {};

  // Add search and filter logic
  if (search) filter.name = { $regex: search, $options: 'i' }; // Search by name (case-insensitive)
  if (style) filter.style = style; // Filter by style

  try {
    const artists = await Artist.find(filter).limit(parseInt(limit) || 0); // Fetch artists with optional limit
    res.status(200).json(artists); // Send the artists as JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

app.put('/artists/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params; // Extract artist ID
  const { name, bio, avatar, style } = req.body; // Extract updated details

  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      id, // Find artist by ID
      { name, bio, avatar, style }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.status(200).json(updatedArtist); // Return updated artist
  } catch (err) {
    res.status(500).json({ error: 'Failed to update artist' });
  }
});

app.delete('/artists/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params; // Ensure you're getting the correct ID
    const deletedArtist = await Artist.findByIdAndDelete(id);
    if (!deletedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete artist' });
  }
});



app.get('/stats/tattoos/popular-styles', authenticateAdmin, async (req, res) => {
  try {
    const popularStyles = await Tattoo.aggregate([
      { $group: { _id: '$style', count: { $sum: 1 } } }, // Group by style
      { $sort: { count: -1 } } // Sort by count in descending order
    ]);

    res.status(200).json(popularStyles); // Return aggregated data
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});


app.get('/stats/general', authenticateAdmin, async (req, res) => {
  try {
    const totalTattoos = await Tattoo.countDocuments(); // Count total tattoos
    const totalArtists = await Artist.countDocuments(); // Count total artists

    res.status(200).json({ totalTattoos, totalArtists }); // Return totals
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});


// Start the Server
app.listen(5000, () => console.log('Server running on port 5000'));

