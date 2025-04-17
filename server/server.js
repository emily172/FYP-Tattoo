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
const TattooStyle = require('./models/TattooStyle');//TattooStyle model
const FAQ = require('./models/FAQ'); //FAQ model
const History = require('./models/History'); //History model
const Profile = require('./models/Profile'); // /Profile model'


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
    const styles = await TattooStyle.find(); // Fetch all styles
    res.json(styles); // Include all fields in the response
  } catch (err) {
    console.error('Error fetching tattoo styles:', err);
    res.status(500).json({ error: 'Failed to fetch tattoo styles' });
  }
});


// Get a single tattoo style
app.get('/tattoo-styles/:id', async (req, res) => {
  try {
    const style = await TattooStyle.findById(req.params.id); // Fetch style by ID
    if (!style) return res.status(404).json({ error: 'Style not found' });
    res.json(style); // Include all fields in the response
  } catch (err) {
    console.error('Error fetching tattoo style:', err);
    res.status(500).json({ error: 'Failed to fetch tattoo style' });
  }
});



// Add a new tattoo style
app.post('/tattoo-styles', async (req, res) => {
  try {
    const {
      name, description, image, descriptor, images, commonLocations,
      preparation, aftercare, funFacts, history, challenges,
      toolsTechniques, maintenanceTimeline, iconicDesigns,
      studioEnvironment, estimatedDuration,
    } = req.body; // Include all new fields

    const newStyle = new TattooStyle({
      name,
      description,
      image,
      descriptor,
      images,
      commonLocations,
      preparation,
      aftercare,
      funFacts,
      history,
      challenges,
      toolsTechniques,
      maintenanceTimeline,
      iconicDesigns,
      studioEnvironment,
      estimatedDuration,
    });

    await newStyle.save();
    res.status(201).json(newStyle); // Return the newly created style
  } catch (err) {
    console.error('Error adding tattoo style:', err);
    res.status(500).json({ error: 'Failed to add tattoo style' });
  }
});




// Update a tattoo style
app.put('/tattoo-styles/:id', async (req, res) => {
  try {
    const {
      name, description, image, descriptor, images, commonLocations,
      preparation, aftercare, funFacts, history, challenges,
      toolsTechniques, maintenanceTimeline, iconicDesigns,
      studioEnvironment, estimatedDuration,
    } = req.body; // Accept updated fields

    const updatedStyle = await TattooStyle.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        image,
        descriptor,
        images,
        commonLocations,
        preparation,
        aftercare,
        funFacts,
        history,
        challenges,
        toolsTechniques,
        maintenanceTimeline,
        iconicDesigns,
        studioEnvironment,
        estimatedDuration,
      },
      { new: true } // Return the updated style
    );

    if (!updatedStyle) return res.status(404).json({ error: 'Style not found' });
    res.json(updatedStyle);
  } catch (err) {
    console.error('Error updating tattoo style:', err);
    res.status(500).json({ error: 'Failed to update tattoo style' });
  }
});

// Delete a tattoo style
app.delete('/tattoo-styles/:id', async (req, res) => {
  try {
    const deletedStyle = await TattooStyle.findByIdAndDelete(req.params.id); // Delete style by ID
    if (!deletedStyle) return res.status(404).json({ error: 'Style not found' });
    res.json({ message: 'Tattoo style deleted successfully' });
  } catch (err) {
    console.error('Error deleting tattoo style:', err);
    res.status(500).json({ error: 'Failed to delete tattoo style' });
  }
});


// Get all profiles
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find(); // Fetch all profiles
    res.json(profiles); // Include all fields in the response
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// Get a single profile
app.get('/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id); // Fetch profile by ID
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile); // Include all fields in the response
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Add a new profile
app.post('/profiles', async (req, res) => {
  try {
    const {
      name, age, bio, profileImage, interests, skills, contactInfo,
    } = req.body; // Include all new fields

    const newProfile = new Profile({
      name,
      age,
      bio,
      profileImage,
      interests,
      skills,
      contactInfo,
    });

    await newProfile.save();
    res.status(201).json(newProfile); // Return the newly created profile
  } catch (err) {
    console.error('Error adding profile:', err);
    res.status(500).json({ error: 'Failed to add profile' });
  }
});

// Update a profile
app.put('/profiles/:id', async (req, res) => {
  try {
    const {
      name, age, bio, profileImage, interests, skills, contactInfo,
    } = req.body; // Accept updated fields

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        bio,
        profileImage,
        interests,
        skills,
        contactInfo,
      },
      { new: true } // Return the updated profile
    );

    if (!updatedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json(updatedProfile);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Delete a profile
app.delete('/profiles/:id', async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id); // Delete profile by ID
    if (!deletedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile:', err);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});


// Routes for FAQs

// GET all FAQs
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find(); // Fetch all FAQs from the database
    res.status(200).json(faqs);
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// POST a new FAQ
app.post('/api/faqs', async (req, res) => {
  const { category, question, answer } = req.body;
  try {
    const newFAQ = new FAQ({ category, question, answer });
    await newFAQ.save();
    res.status(201).json(newFAQ); // Return the newly created FAQ
  } catch (err) {
    console.error('Error creating FAQ:', err);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

// PUT (Update an FAQ)
app.put('/api/faqs/:id', async (req, res) => {
  const { id } = req.params;
  const { category, question, answer } = req.body;
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(id, { category, question, answer }, { new: true });
    if (!updatedFAQ) return res.status(404).json({ error: 'FAQ not found' });
    res.status(200).json(updatedFAQ);
  } catch (err) {
    console.error('Error updating FAQ:', err);
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

// DELETE an FAQ
app.delete('/api/faqs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) return res.status(404).json({ error: 'FAQ not found' });
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    console.error('Error deleting FAQ:', err);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});


//History Routes

// GET History details
app.get('/api/history', async (req, res) => {
  try {
    const history = await History.find(); // Fetch all history entries
    res.status(200).json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history details' });
  }
});

// POST to Create History Entry
app.post('/api/history', async (req, res) => {
  const historyData = req.body;
  try {
    const newHistory = new History(historyData);
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (err) {
    console.error('Error creating history entry:', err);
    res.status(500).json({ error: 'Failed to create history entry' });
  }
});

// DELETE a History Entry
app.delete('/api/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHistory = await History.findByIdAndDelete(id);
    if (!deletedHistory) {
      return res.status(404).json({ error: 'History entry not found' });
    }
    res.status(200).json({ message: 'History entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting history entry:', err);
    res.status(500).json({ error: 'Failed to delete history entry' });
  }
});


// Start the Server
app.listen(5000, () => console.log('Server running on port 5000'));

