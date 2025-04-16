import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Artists from './pages/Artists';
import Contact from './pages/Contact';
import Studio from './pages/Studio'; // User-facing Studio page
import BlogList from './pages/BlogList'; // Blog list page
import BlogPost from './pages/BlogPost'; // Single blog post page
import AdminRegister from './pages/AdminRegister'; // Admin Register
import AdminLogin from './pages/AdminLogin'; // Admin Login
import AdminDashboard from './pages/AdminDashboard'; // Admin Dashboard
import ManageArtists from './pages/ManageArtists'; // Artists management
import ManageGallery from './pages/ManageGallery'; // Gallery management
import ManageStudio from './pages/ManageStudio'; // Admin Studio management
import AdminBlogManager from './pages/AdminBlogManager'; // Admin Blog Management
import TattooStyles from './pages/TattooStyles'; // User-facing Tattoo Styles page
import TattooStylePage from './pages/TattooStylePage'; // Single Tattoo Style page
import ManageTattooStyles from './pages/ManageTattooStyles'; // Admin Tattoo Styles management

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} /> {/* Studio page */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<BlogList />} /> {/* Blog List Page */}
        <Route path="/blogs/:id" element={<BlogPost />} /> {/* Single Blog Post Page */}
        <Route path="/styles" element={<TattooStyles />} /> {/* Tattoo Styles List Page */}
        <Route path="/styles/:id" element={<TattooStylePage />} /> {/* Dedicated Tattoo Style Page */}

        {/* Admin Routes */}
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} /> {/* Main Admin Dashboard */}
        <Route path="/dashboard/artists" element={<ManageArtists />} /> {/* Artists Management */}
        <Route path="/dashboard/gallery" element={<ManageGallery />} /> {/* Gallery Management */}
        <Route path="/dashboard/studio" element={<ManageStudio />} /> {/* Studio Management */}
        <Route path="/dashboard/blogs" element={<AdminBlogManager />} /> {/* Admin Blog Management */}
        <Route path="/dashboard/styles" element={<ManageTattooStyles />} /> {/* Admin Tattoo Styles Management */}
      </Routes>
    </Router>
  );
}

export default App;
