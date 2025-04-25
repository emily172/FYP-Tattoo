require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Required for Socket.IO integration
const socketIo = require('socket.io'); // Required for real-time chat functionality
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateAdmin = require('./middlewares/authMiddleware'); // Authentication middleware
const authenticateRole = require('./middlewares/authorizeRole'); // General authentication middleware
const authenticate = require('./middlewares/authenticate'); // General authentication middleware


const Admin = require('./models/Admin'); // Admin model
const User = require('./models/User'); // User model



const TattooGallery = require('./models/TattooGallery'); // Import TattooGallery model
const Tattoo = require('./models/Tattoo'); // Tattoo model
const Artist = require('./models/Artist');
const Blog = require('./models/Blog'); // Blog model
const Studio = require('./models/Studio'); //Studio model
const TattooStyle = require('./models/TattooStyle');//TattooStyle model
const Profile = require('./models/Profile');//Profile model
const FAQ = require('./models/FAQ'); //FAQ model
const TattooImage = require('./models/TattooImage');
const History = require('./models/History');
const About = require('./models/About');
const Image = require('./models/Image'); // Your Image schema
const Contact = require('./models/Contact');


//Chatting Application
const ChatMessage = require('./models/ChatMessage'); // Import the ChatMessage model
const Message = require('./models/Message'); // Message model




//Uploads
const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix); // Ensure unique file names
  },
});

// Initialize Multer
const upload = multer({ storage });


const fs = require("fs");


// Ensure the "uploads" directory exists
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created 'uploads' directory");
}




const app = express();
const server = http.createServer(app); // Create server for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend address
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Routes


// ----- Chat Functionality -----
// POST: Send a message
// Send a message
/*app.post('/messages', authenticate, async (req, res) => {
  const { receiverId, message } = req.body;

  try {
    const newMessage = new Message({
      senderId: req.userId, // Extracted from token
      receiverId,
      message,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});*/

// Route for sending a message (with optional file)
app.post('/messages', authenticate, upload.single('file'), async (req, res) => {
  const { receiverId, message } = req.body;

  try {
    // Create a new message object
    const newMessage = new Message({
      senderId: req.userId, // Extracted from token
      receiverId,
      message,
    });

    // If a file is uploaded, include file metadata
    if (req.file) {
      newMessage.fileName = req.file.originalname; // Store the original file name
      newMessage.filePath = `/uploads/${req.file.filename}`; // Save the file path
      newMessage.fileType = req.file.mimetype; // Save the MIME type (e.g., image/png)
    }

    // Save the message to the database
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Fetch messages for a specific chat
app.get('/messages', authenticate, async (req, res) => {
  const { chatWithId } = req.query;

  try {
    // Find messages between the sender and receiver
    const messages = await Message.find({
      $or: [
        { senderId: req.userId, receiverId: chatWithId },
        { senderId: chatWithId, receiverId: req.userId },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp (oldest to newest)
    
    res.status(200).json(messages); // Send the fetched messages to the frontend
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});


// ----- Real-Time Chat with Socket.IO -----
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for incoming messages
  socket.on('sendMessage', async (data) => {
    const { senderId, receiverId, message } = data;

    try {
      // Save message to the database
      const newMessage = await Message.create({ senderId, receiverId, message });

      // Emit the new message to the intended recipient
      io.to(receiverId).emit('receiveMessage', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });


  // Handle WebRTC offer
  socket.on('offer', (data) => {
    const { offer, to } = data;
    socket.to(to).emit('offer', { offer, from: socket.id });
  });

  // Handle WebRTC answer
  socket.on('answer', (data) => {
    const { answer, to } = data;
    socket.to(to).emit('answer', { answer, from: socket.id });
  });

  // Handle ICE candidates
  socket.on('ice-candidate', (data) => {
    const { candidate, to } = data;
    socket.to(to).emit('ice-candidate', { candidate, from: socket.id });
  });

  // Notify when user disconnects
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  
});

// Store connected users and their socket IDs
const connectedUsers = {}; // Key: userId, Value: socketId

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('register-user', (userId) => {
    connectedUsers[userId] = socket.id; // Map userId to socketId
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    const userId = Object.keys(connectedUsers).find((key) => connectedUsers[key] === socket.id);
    if (userId) delete connectedUsers[userId];
  });
});

// Route to fetch Socket ID for a user
app.get('/api/socket/:userId', authenticate, (req, res) => {
  const { userId } = req.params;
  const socketId = connectedUsers[userId];
  if (socketId) {
    res.status(200).json({ socketId });
  } else {
    res.status(404).json({ error: 'User not connected' });
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle WebRTC offer
  socket.on('offer', (data) => {
    const { offer, to } = data;
    socket.to(to).emit('offer', { offer, from: socket.id });
  });

  // Handle WebRTC answer
  socket.on('answer', (data) => {
    const { answer, to } = data;
    socket.to(to).emit('answer', { answer, from: socket.id });
  });

  // Handle ICE candidates
  socket.on('ice-candidate', (data) => {
    const { candidate, to } = data;
    socket.to(to).emit('ice-candidate', { candidate, from: socket.id });
  });

  socket.on('register-user', (userId) => {
    connectedUsers[userId] = socket.id;
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    const userId = Object.keys(connectedUsers).find((key) => connectedUsers[key] === socket.id);
    if (userId) delete connectedUsers[userId];
  });
});

// Route to fetch connected Socket IDs
app.get('/api/socket/:userId', authenticate, (req, res) => {
  const { userId } = req.params;
  const socketId = connectedUsers[userId];
  socketId ? res.status(200).json({ socketId }) : res.status(404).json({ error: 'User not connected' });
});
 
/*
socket.on('offer', (data) => {
  console.log(`Offer from ${socket.id} to ${data.to}`);
});

socket.on('answer', (data) => {
  console.log(`Answer from ${socket.id} to ${data.to}`);
});

socket.on('ice-candidate', (data) => {
  console.log(`ICE candidate from ${socket.id} to ${data.to}`);
});
*/

// ----- Authentication Routes -----
// Admin registration
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

// Admin login
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

app.get("/api/users", authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("email _id"); // Fetch users only
    res.status(200).json({ contacts: users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});


// User registration
app.post('/user/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login
app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log in' });
  }
});

app.get("/api/admins", authenticate, async (req, res) => {
  try {
    const admins = await Admin.find().select("email _id"); // Fetch admins only
    res.status(200).json({ contacts: admins });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admins." });
  }
});



// Fetch both users and admins for admin role
app.get('/api/contacts', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find().select("email _id"); // Fetch all users
    const admins = await Admin.find().select("email _id"); // Fetch all admins
    const combinedContacts = [...users, ...admins]; // Combine both lists
    res.status(200).json({ contacts: combinedContacts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});


app.post("/messages/:messageId/react", authenticate, async (req, res) => {
  const { emoji, userId } = req.body; // Emoji and user who reacted
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) return res.status(404).send({ error: "Message not found" });

    message.reactions.push({ emoji, userId });
    await message.save();
    res.status(200).send(message);
  } catch (err) {
    res.status(500).send({ error: "Failed to add reaction." });
  }
});

//PIN 
app.post("/api/users/:userId/pin-contact", authenticate, async (req, res) => {
  const { contactId } = req.body; // ID of the contact to pin

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    // Add contact to pinnedContacts if not already pinned
    if (!user.pinnedContacts.includes(contactId)) {
      user.pinnedContacts.push(contactId);
      await user.save();
    }

    res.status(200).send({ message: "Contact pinned successfully", pinnedContacts: user.pinnedContacts });
  } catch (err) {
    console.error("Error pinning contact:", err);
    res.status(500).send({ error: "Failed to pin contact." });
  }
});


//UNPIN
app.post("/api/users/:userId/unpin-contact", authenticate, async (req, res) => {
  const { contactId } = req.body; // ID of the contact to unpin

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    // Remove contact from pinnedContacts if it exists
    user.pinnedContacts = user.pinnedContacts.filter((id) => id.toString() !== contactId);
    await user.save();

    res.status(200).send({ message: "Contact unpinned successfully", pinnedContacts: user.pinnedContacts });
  } catch (err) {
    console.error("Error unpinning contact:", err);
    res.status(500).send({ error: "Failed to unpin contact." });
  }
});

//GET ALL PINS
app.get("/api/users/:userId/pinned-contacts", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("pinnedContacts"); // Populate contact details
    if (!user) return res.status(404).send({ error: "User not found" });

    res.status(200).send({ pinnedContacts: user.pinnedContacts });
  } catch (err) {
    console.error("Error fetching pinned contacts:", err);
    res.status(500).send({ error: "Failed to fetch pinned contacts." });
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
// API Routes
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

app.get('/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.post('/profiles', async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (err) {
    console.error('Error adding profile:', err);
    res.status(500).json({ error: 'Failed to add profile' });
  }
});

app.put('/profiles/:id', async (req, res) => {
  try {
    console.log('Incoming Payload:', req.body); // Debugging incoming data
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json(updatedProfile);
  } catch (err) {
    console.error('Error:', err.message); // Log detailed error
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


app.delete('/profiles/:id', async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile:', err);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});


//Update a Profile
/*app.put('/profiles/:id', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (err) {
    console.error('Error updating profile:', err.message); // More descriptive logging
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.put('/profiles/:id', async (req, res) => {
  try {
    console.log('Incoming Payload:', req.body); // Debugging the request body
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json(updatedProfile);
  } catch (err) {
    console.error('Error:', err.message); // Log the error message
    res.status(500).json({ error: 'Failed to update profile' });
  }
});
*/

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

app.get('/api/contact', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 results per page

  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit) // Skip documents based on the current page
      .limit(Number(limit)); // Limit the number of documents

    const total = await Contact.countDocuments(); // Total number of documents for pagination metadata

    res.json({
      contacts,
      total, // Total messages
      page: Number(page), // Current page
      totalPages: Math.ceil(total / limit), // Total pages
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact messages', error: err });
  }
});


// Get All Contact Messages (for Admins)
app.get('/api/contact', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 messages per page

  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit) // Skip documents based on page number
      .limit(Number(limit)); // Limit the number of documents per page

    const total = await Contact.countDocuments(); // Total number of messages for pagination metadata

    res.json({
      contacts,         // Paginated messages
      total,            // Total number of messages
      page: Number(page), // Current page
      limit: Number(limit), // Limit per page
      totalPages: Math.ceil(total / limit), // Total number of pages
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact messages', error: err });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body); // Assuming Contact is your Mongoose model
    await contact.save(); // Save the new contact message to the database
    res.status(201).json(contact); // Respond with the created contact
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact', error: err });
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


// Start the server
const PORT = 5000; 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));