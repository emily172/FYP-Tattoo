// Setting up the backend using express - API JSON requests, cors -Cross Origin Resource Sharing and mongoose - DB
const express = require("express");
const cors = require("cors");
//Import Mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB - Loaded from the env file
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("This is the Ink Pots API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
