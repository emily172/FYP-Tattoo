import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Artists from './pages/Artists';
import Contact from './pages/Contact';
import AdminRegister from './pages/AdminRegister'; // Admin Register
import AdminLogin from './pages/AdminLogin'; // Admin Login
import AdminDashboard from './pages/AdminDashboard'; // Admin Dashboard
import ManageArtists from './pages/ManageArtists'; // Artists management
import ManageGallery from './pages/ManageGallery'; // Gallery management
import BlogList from './pages/BlogList'; // Blog List Page
import BlogPost from './pages/BlogPost'; // Individual Blog Post Page
import AdminBlogManager from './pages/AdminBlogManager'; // Admin Blog Management

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogPost />} />

        {/* Admin Routes */}
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/artists" element={<ManageArtists />} />
        <Route path="/dashboard/gallery" element={<ManageGallery />} />
        <Route path="/dashboard/blogs" element={<AdminBlogManager />} /> {/* Moved to dashboard */}
      </Routes>
    </Router>
  );
}

export default App;

