import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Artists from './pages/Artists';
import Contact from './pages/Contact';
import AdminRegister from './pages/AdminRegister'; // Add AdminRegister
import AdminLogin from './pages/AdminLogin'; // Add AdminLogin
import AdminDashboard from './pages/AdminDashboard'; // Add AdminDashboard
import ManageArtists from './pages/ManageArtists'; // Artists management
import ManageGallery from './pages/ManageGallery'; // Gallery management


function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is still at the top */}
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/artists" element={<ManageArtists />} />
        <Route path="/dashboard/gallery" element={<ManageGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
