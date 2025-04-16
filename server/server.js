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
const Blog = require('./models/Blog'); // Blog model
const Studio = require('./models/Studio'); //Studio model
const TattooStyle = require('./models/TattooStyle');


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
      expiresIn: '24h',
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


//Blogs

// Create a blog post
app.post('/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Get all blog posts
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by date, newest first
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get a single blog post
app.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Update a blog post
app.put('/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete a blog post
app.delete('/blogs/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});


//Studio 
// Get studio details
app.get('/studio', async (req, res) => {
  try {
    const studio = await Studio.findOne();
    if (!studio) return res.status(404).json({ message: 'Studio details not found.' });
    res.json(studio);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch studio details.' });
  }
});

// Create or update studio details
app.put('/studio', async (req, res) => {
  try {
    const updatedStudio = await Studio.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedStudio);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update studio details.' });
  }
});

// Delete studio (if needed for resetting)
app.delete('/studio', async (req, res) => {
  try {
    const deletedStudio = await Studio.findOneAndDelete();
    res.json({ message: 'Studio details deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete studio details.' });
  }
});

// Tattoo Styles Endpoints
// Get all tattoo styles
app.get('/tattoo-styles', async (req, res) => {
  try {
    const styles = await TattooStyle.find().sort({ createdAt: -1 });
    res.json(styles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tattoo styles' });
  }
});

// Get a single tattoo style
app.get('/tattoo-styles/:id', async (req, res) => {
  try {
    const style = await TattooStyle.findById(req.params.id);
    if (!style) return res.status(404).json({ error: 'Style not found' });
    res.json(style);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tattoo style' });
  }
});

// Add a new tattoo style
app.post('/tattoo-styles', async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const newStyle = new TattooStyle({ name, description, image });
    await newStyle.save();
    res.status(201).json(newStyle);
  } catch (err) {
    console.error('Error adding tattoo style:', err);
    res.status(500).json({ error: 'Failed to add tattoo style' });
  }
});

// Update a tattoo style
app.put('/tattoo-styles/:id', async (req, res) => {
  try {
    const updatedStyle = await TattooStyle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStyle) return res.status(404).json({ error: 'Style not found' });
    res.json(updatedStyle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tattoo style' });
  }
});

// Delete a tattoo style
app.delete('/tattoo-styles/:id', async (req, res) => {
  try {
    const deletedStyle = await TattooStyle.findByIdAndDelete(req.params.id);
    if (!deletedStyle) return res.status(404).json({ error: 'Style not found' });
    res.json({ message: 'Tattoo style deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tattoo style' });
  }
});

// Start the Server
app.listen(5000, () => console.log('Server running on port 5000'));

