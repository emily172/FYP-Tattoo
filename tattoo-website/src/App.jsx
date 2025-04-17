import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Landing page
import Gallery from './pages/Gallery'; // User-facing gallery page
import Artists from './pages/Artists'; // List of all artists
import ArtistProfilePage from './pages/ArtistProfilePage'; // Detailed artist profiles
import Contact from './pages/Contact'; // Contact page
import Studio from './pages/Studio'; // User-facing Studio page
import BlogList from './pages/BlogList'; // Blog list page
import BlogPost from './pages/BlogPost'; // Single blog post page
import AdminRegister from './pages/AdminRegister'; // Admin registration
import AdminLogin from './pages/AdminLogin'; // Admin login
import AdminDashboard from './pages/AdminDashboard'; // Main admin dashboard
import ManageArtists from './pages/ManageArtists'; // Artists management dashboard
import ManageGallery from './pages/ManageGallery'; // Gallery management dashboard
import ManageStudio from './pages/ManageStudio'; // Studio management dashboard
import AdminBlogManager from './pages/AdminBlogManager'; // Admin blog management dashboard
import TattooStyles from './pages/TattooStyles'; // User-facing tattoo styles list
import TattooStylePage from './pages/TattooStylePage'; // Single tattoo style page
import ManageTattooStyles from './pages/ManageTattooStyles'; // Admin tattoo styles management
import Profiles from './pages/Profiles'; // Included Profile pages
import ProfliePage from './pages/ProfilePage'; // Single profile page
import ManageProfiles from './pages/ManageProfiles'; // Admin profile management
import FAQPage from './pages/FAQPage';
import FAQManagement from './pages/FAQManagement'; // Import the FAQManagement page
import History from './pages/HistoryTimeline'; // Public History component
import ManageHistory from './pages/ManageHistory'; // Admin History dashboard



function App() {
  return (
    <Router>
      <Navbar /> {/* Navigation bar visible on all pages */}
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/studio" element={<Studio />} /> {/* Studio overview */}
        <Route path="/gallery" element={<Gallery />} /> {/* Explore tattoo gallery */}
        <Route path="/artists" element={<Artists />} /> {/* List of artists */}
        <Route path="/artists/:id" element={<ArtistProfilePage />} /> {/* Detailed artist profile */}
        <Route path="/contact" element={<Contact />} /> {/* Contact form */}
        <Route path="/blogs" element={<BlogList />} /> {/* Blog list */}
        <Route path="/blogs/:id" element={<BlogPost />} /> {/* Single blog post */}
        <Route path="/styles" element={<TattooStyles />} /> {/* Tattoo styles overview */}
        <Route path="/styles/:id" element={<TattooStylePage />} /> {/* Detailed tattoo style page */}
        
        <Route path="/profiles" element={<Profiles />} /> {/* Profile overview */}
        <Route path="/profiles/:id" element={<ProfliePage />} /> {/* Detailed profile page */}
        <Route path="/faq" element={<FAQPage />} /> {/* FAQ Page */}
        <Route path="/history" element={<History />} /> {/* History page */}

        {/* Admin Routes */}
        <Route path="/register" element={<AdminRegister />} /> {/* Admin registration */}
        <Route path="/login" element={<AdminLogin />} /> {/* Admin login */}
        <Route path="/dashboard" element={<AdminDashboard />} /> {/* Admin dashboard */}
        <Route path="/dashboard/artists" element={<ManageArtists />} /> {/* Manage artists */}
        <Route path="/dashboard/gallery" element={<ManageGallery />} /> {/* Manage gallery */}
        <Route path="/dashboard/studio" element={<ManageStudio />} /> {/* Manage studio */}
        <Route path="/dashboard/blogs" element={<AdminBlogManager />} /> {/* Manage blogs */}
        <Route path="/dashboard/styles" element={<ManageTattooStyles />} /> {/* Manage tattoo styles */}
        <Route path="/dashboard/profiles" element={<ManageProfiles />} /> {/* Manage tattoo styles */}
        <Route path="/dashboard/faqs" element={<FAQManagement />} /> {/* Admin FAQ Management */}
        <Route path="/dashboard/history" element={<ManageHistory />} /> {/* Admin History management */}
      </Routes>
    </Router>
  );
}

export default App;
