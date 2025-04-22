require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateAdmin = require('./middlewares/authMiddleware'); // Authentication middleware

const Admin = require('./models/Admin'); // Admin model
const TattooGallery = require('./models/TattooGallery'); // Import TattooGallery model
const Tattoo = require('./models/Tattoo'); // Tattoo model
const Artist = require('./models/Artist');  
const Blog = require('./models/Blog'); // Blog model
const Studio = require('./models/Studio'); //Studio model
const TattooStyle = require('./models/TattooStyle');//TattooStyle model
const Profile = require('./models/Profile');//TattooStyle model
const FAQ = require('./models/FAQ'); //FAQ model
const TattooImage = require('./models/TattooImage');
const History = require('./models/History');
const About = require('./models/About');
const Image = require('./models/Image'); // Your Image schema



const Contact = require('./models/Contact');


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

//Tattoo Image Gallery
// Get all tattoo images
app.get('/tattoo-gallery', async (req, res) => {
  try {
    const tattoos = await TattooGallery.find().populate('createdBy');
    res.json(tattoos);
  } catch (err) {
    console.error('Error fetching tattoo gallery:', err);
    res.status(500).json({ error: 'Failed to fetch tattoo gallery' });
  }
});

// Add a new tattoo image
app.post('/tattoo-gallery', async (req, res) => {
  const { title, imageUrl } = req.body;
  
  // Validate required fields
  if (!title || !imageUrl) {
    console.error('Validation Error: Missing required fields');
    return res.status(400).json({ error: 'Title and Image URL are required' });
  }

  try {
    const newTattoo = new TattooGallery(req.body);
    await newTattoo.save();
    res.status(201).json(newTattoo);
  } catch (err) {
    console.error('Error adding tattoo image:', err.message);
    res.status(500).json({ error: 'Failed to add tattoo image' });
  }
});



// Delete a tattoo image
app.delete('/tattoo-gallery/:id', async (req, res) => {
  try {
    const deletedTattoo = await TattooGallery.findByIdAndDelete(req.params.id);
    if (!deletedTattoo) return res.status(404).json({ error: 'Tattoo image not found' });
    res.json({ message: 'Tattoo image deleted successfully' });
  } catch (err) {
    console.error('Error deleting tattoo image:', err);
    res.status(500).json({ error: 'Failed to delete tattoo image' });
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

//ARTIST
// Fetch Artists
app.get('/artists', async (req, res) => {
  const { search, specialisation, popularity, limit } = req.query;
  const filter = {};

  // Add filters based on query parameters
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (specialisation) filter.specialisation = { $regex: specialisation, $options: 'i' };
  if (popularity) filter.popularity = parseInt(popularity);

  try {
    const artists = await Artist.find(filter).limit(parseInt(limit) || 0);
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

// Add Artist (Protected Route)
app.post('/artists', authenticateAdmin, async (req, res) => {
  const { 
    name, image, popularity, contacts, socialMediaLinks, 
    specialisation, bio, artwork, experience, languagesSpoken, 
    awards, certifications, portfolioTags 
  } = req.body;

  // Log incoming data for debugging
  console.log('Incoming artist data:', req.body);

  try {
    const newArtist = new Artist({ 
      name, image, popularity, contacts, socialMediaLinks, 
      specialisation, bio, artwork, experience, languagesSpoken, 
      awards, certifications, portfolioTags 
    });

    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    console.error('Error creating artist:', err); // Log the error
    res.status(400).json({ error: 'Failed to add artist', details: err.message });
  }
});


// Update Artist (Protected Route)
app.put('/artists/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { 
    name, image, popularity, contacts, socialMediaLinks, 
    specialisation, bio, artwork, experience, languagesSpoken, 
    awards, certifications, portfolioTags 
  } = req.body;

  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      { 
        name, image, popularity, contacts, socialMediaLinks, 
        specialisation, bio, artwork, experience, languagesSpoken, 
        awards, certifications, portfolioTags 
      },
      { new: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.status(200).json(updatedArtist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update artist' });
  }
});

// Delete Artist (Protected Route)
app.delete('/artists/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArtist = await Artist.findByIdAndDelete(id);

    if (!deletedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete artist' });
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


// Get all blog posts with filtering and searching
app.get('/blogs', async (req, res) => {
  try {
    const { category, search } = req.query; // Query parameters for filtering and searching
    let query = {};

    // Add category filtering
    if (category && category !== 'All') {
      query.category = category; // Filter blogs by category
    }

    // Add search functionality
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive regex search by title
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 }); // Sort blogs by newest first
    res.json(blogs); // Return filtered and sorted blogs
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
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
      name,
      bio,
      profileImage,
      popularity,
      interests,
      skills,
      contactInfo,
      experience,
      tattooStyles,
      portfolio,
      certifications,
      tags,
      socialMediaLinks, // Includes TikTok, Instagram, Facebook, and X
      languagesSpoken,
      availability,
      pricing,
      safetyProtocols,
      awards,
      artwork,
      origin, // Includes city and country
    } = req.body;

    const newProfile = new Profile({
      name,
      bio,
      profileImage,
      popularity,
      interests,
      skills,
      contactInfo,
      experience,
      tattooStyles,
      portfolio,
      certifications,
      tags,
      socialMediaLinks,
      languagesSpoken,
      availability,
      pricing,
      safetyProtocols,
      awards,
      artwork,
      origin,
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
      name,
      bio,
      profileImage,
      popularity,
      interests,
      skills,
      contactInfo,
      experience,
      tattooStyles,
      portfolio,
      certifications,
      tags,
      socialMediaLinks,
      languagesSpoken,
      availability,
      pricing,
      safetyProtocols,
      awards,
      artwork,
      origin,
    } = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        name,
        bio,
        profileImage,
        popularity,
        interests,
        skills,
        contactInfo,
        experience,
        tattooStyles,
        portfolio,
        certifications,
        tags,
        socialMediaLinks,
        languagesSpoken,
        availability,
        pricing,
        safetyProtocols,
        awards,
        artwork,
        origin,
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


// PUT to Update a History Entry
app.put('/api/history/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedHistory = await History.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedHistory) {
      return res.status(404).json({ error: 'History entry not found' });
    }

    res.status(200).json(updatedHistory);
  } catch (err) {
    console.error('Error updating history entry:', err);
    res.status(500).json({ error: 'Failed to update history entry' });
  }
});



// GET Tattoo Image details
app.get('/api/images', async (req, res) => {
  try {
    const images = await TattooImage.find(); // Fetch all tattoo image entries
    res.status(200).json(images);
  } catch (err) {
    console.error('Error fetching tattoo images:', err);
    res.status(500).json({ error: 'Failed to fetch tattoo image details' });
  }
});

// POST to Create Tattoo Image Entry
app.post('/api/images', async (req, res) => {
  const imageData = req.body;
  try {
    const newImage = new TattooImage(imageData);
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error('Error creating tattoo image entry:', err);
    res.status(500).json({ error: 'Failed to create tattoo image entry' });
  }
});

// DELETE a Tattoo Image Entry
app.delete('/api/images/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedImage = await TattooImage.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ error: 'Tattoo image entry not found' });
    }
    res.status(200).json({ message: 'Tattoo image entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting tattoo image entry:', err);
    res.status(500).json({ error: 'Failed to delete tattoo image entry' });
  }
});





//About Page
// Get About Page Content
// Get About Page Content
app.get('/api/about/manage', async (req, res) => {
  try {
    const about = await About.findOne(); // Fetch the about content
    if (!about) return res.status(404).json({ message: 'About content not found.' });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch About content.', error: err });
  }
});


// Create About Content
app.post('/manage', async (req, res) => {
  const { mission, story, vision, values } = req.body;

  try {
    const newAbout = new About({ mission, story, vision, values });
    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create About content', error: err });
  }
});

// Update About Content
app.put('/manage/:id', async (req, res) => {
  const { mission, story, vision, values } = req.body;

  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { mission, story, vision, values },
      { new: true }
    );
    res.json(updatedAbout);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update About content', error: err });
  }
});

//Images

app.get('/api/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).json({ error: 'Failed to fetch image details' });
  }
});


app.post('/api/images', async (req, res) => {
  try {
    const newImage = new Image(req.body);
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error('Error adding image:', err);
    res.status(500).json({ error: 'Failed to add image' });
  }
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

app.put('/api/images/:id', async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedImage);
  } catch (err) {
    console.error('Error updating image:', err);
    res.status(500).json({ error: 'Failed to update image' });
  }
});



//Contact

// Submit a Contact Message
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit contact message', error: err });
  }
});

// Get All Contact Messages (for Admins)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact messages', error: err });
  }
});


app.get('/api/contact/search', async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Contact.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { message: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 }); // Sort results by newest first

    res.json(results); // Return filtered results
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err });
  }
});


app.get('/api/contact/autocomplete', async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Contact.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { message: { $regex: query, $options: 'i' } },
      ],
    }).limit(5); // Limit to top 5 suggestions for efficiency

    // Respond with simplified data for suggestions
    const suggestions = results.map((result) => ({
      name: result.name,
      email: result.email,
      messageSnippet: result.message.slice(0, 50) + '...', // Show first 50 characters of the message
    }));

    res.json(suggestions); // Return suggestions
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch autocomplete suggestions', error: err });
  }
});


app.get('/api/contact/filter', async (req, res) => {
  const { startDate, endDate, status, category } = req.query;

  // Build filter object dynamically based on query parameters
  const filter = {
    ...(startDate && endDate && {
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }),
    ...(status && { status }),
    ...(category && { category }),
  };

  try {
    const results = await Contact.find(filter).sort({ createdAt: -1 }); // Filter and sort
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to filter messages', error: err });
  }
});


app.put('/api/contact/:id/status', async (req, res) => {
  const { status } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err });
  }
});


app.get('/api/contact/stats', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err });
  }
});



app.put('/api/contact/bulk-update', async (req, res) => {
  const { ids, status } = req.body;

  try {
    const updatedContacts = await Contact.updateMany(
      { _id: { $in: ids } }, // Match the selected IDs
      { $set: { status } }   // Update status
    );
    res.json({ message: 'Bulk update successful', updatedContacts });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contacts', error: err });
  }
});
/*
app.delete('/api/contact/bulk-delete', async (req, res) => {
  const { ids } = req.body;

  try {
    await Contact.deleteMany({ _id: { $in: ids } }); // Delete all matching IDs
    res.json({ message: 'Bulk delete successful' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contacts', error: err });
  }
});*/
app.put('/api/contact/soft-delete', async (req, res) => {
  const { ids } = req.body;

  try {
    await Contact.updateMany(
      { _id: { $in: ids } },
      { $set: { softDeleted: true } } // Set the softDeleted flag to true
    );
    res.json({ message: 'Messages soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to soft delete messages', error: err });
  }
});


app.delete('/api/contact/permanent-delete', async (req, res) => {
  try {
    await Contact.deleteMany({ softDeleted: true }); // Permanently delete flagged messages
    res.json({ message: 'Messages permanently deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete messages', error: err });
  }
});

app.put('/api/contact/undo-delete', async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: 'Invalid or missing "ids" array' });
  }

  try {
    const result = await Contact.updateMany(
      { _id: { $in: ids } },
      { $set: { softDeleted: false } }
    );
    res.json({ message: 'Messages restored successfully', result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to undo delete', error: err });
  }
});



// Start the Server
app.listen(5000, () => console.log('Server running on port 5000'));

