import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Landing page
import TattooGallery from './pages/TattooGallery';
import ManageTattooGallery from './pages/ManageTattooGallery';
import Gallery from './pages/Gallery'; // User-facing gallery page
import Artist from './pages/Artist';
import ManageArtist from './pages/ManageArtist'; // Artist management
import AdminMessages from './pages/AdminMessages';
import Contact from './pages/Contact'; // Contact page
import Studio from './pages/Studio'; // User-facing Studio page
import BlogList from './pages/BlogList'; // Blog list page
import BlogPost from './pages/BlogPost'; // Single blog post page
import AdminRegister from './pages/AdminRegister'; // Admin registration
import AdminLogin from './pages/AdminLogin'; // Admin login
import AdminDashboard from './pages/AdminDashboard'; // Main admin dashboard
import ManageGallery from './pages/ManageGallery'; // Gallery management dashboard
import ManageStudio from './pages/ManageStudio'; // Studio management dashboard
import AdminBlogManager from './pages/AdminBlogManager'; // Admin blog management dashboard
import TattooStyles from './pages/TattooStyles'; // User-facing tattoo styles list
import TattooStylePage from './pages/TattooStylePage'; // Single tattoo style page
import ManageTattooStyles from './pages/ManageTattooStyles'; // Admin tattoo styles management
import Profiles from './pages/Profiles'; // User-facing profile list
import ProfilePage from './pages/ProfilePage'; // Single profile page
import ManageProfiles from './pages/ManageProfiles'; // Admin profile management
import FAQPage from './pages/FAQPage';
import FAQManagement from './pages/FAQManagement'; // Admin FAQ management
import History from './pages/HistoryTimeline'; // Public History component
import ManageHistory from './pages/ManageHistory'; // Admin History dashboard
import TattooTimeline from './pages/TattooTimeline'; // Public Tattoo Images component
import ManageTattooImages from './pages/ManageTattooImages'; // Admin Tattoo Images dashboard
import About from './pages/About';
import ManageAbout from './pages/ManageAbout';
import Chat from './pages/Chat'; // Chat page (Main chat functionality for users/admins)
import UserRegister from './pages/UserRegister'; // User registration
import UserLogin from './pages/UserLogin'; // User login

function App() {
  return (
    <Router>
      <Navbar /> {/* Navigation bar visible on all pages */}
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/studio" element={<Studio />} /> {/* Studio overview */}
        <Route path="/tattoo-gallery" element={<TattooGallery />} /> {/* View tattoo gallery */}
        <Route path="/gallery" element={<Gallery />} /> {/* Explore gallery */}
        <Route path="/contact" element={<Contact />} /> {/* Contact form */}
        <Route path="/blogs" element={<BlogList />} /> {/* Blog list */}
        <Route path="/blogs/:id" element={<BlogPost />} /> {/* Single blog post */}
        <Route path="/styles" element={<TattooStyles />} /> {/* Tattoo styles overview */}
        <Route path="/styles/:id" element={<TattooStylePage />} /> {/* Detailed tattoo style page */}
        <Route path="/profiles" element={<Profiles />} /> {/* Profiles overview */}
        <Route path="/profiles/:id" element={<ProfilePage />} /> {/* Detailed profile page */}
        <Route path="/faq" element={<FAQPage />} /> {/* FAQ Page */}
        <Route path="/history" element={<History />} /> {/* History page */}
        <Route path="/artist" element={<Artist/>} /> {/* About page */}

        {/* Admin Routes */}
        <Route path="/register" element={<AdminRegister />} /> {/* Admin registration */}
        <Route path="/login" element={<AdminLogin />} /> {/* Admin login */}
        <Route path="/dashboard" element={<AdminDashboard />} /> {/* Admin dashboard */}
        <Route path="/dashboard/manage-tattoo-gallery" element={<ManageTattooGallery />} /> {/* Manage tattoo gallery */}
        <Route path="/dashboard/gallery" element={<ManageGallery />} /> {/* Manage gallery */}
        <Route path="/dashboard/studio" element={<ManageStudio />} /> {/* Manage studio */}
        <Route path="/dashboard/blogs" element={<AdminBlogManager />} /> {/* Manage blogs */}
        <Route path="/dashboard/styles" element={<ManageTattooStyles />} /> {/* Manage tattoo styles */}
        <Route path="/dashboard/profiles" element={<ManageProfiles />} /> {/* Manage profiles */}
        <Route path="/dashboard/faqs" element={<FAQManagement />} /> {/* Admin FAQ Management */}
        <Route path="/dashboard/history" element={<ManageHistory />} /> {/* Admin History management */}
        <Route path="/dashboard/manage-about" element={<ManageAbout />} /> {/* Admin About Page management */}
        <Route path="/dashboard/admin-messages" element={<AdminMessages />} /> {/* Admin Messages */}
        <Route path="/dashboard/artist" element={<ManageArtist />} /> {/* Manage artist */}

        {/* Chat Routes */}
        <Route path="/dashboard/chat" element={<Chat />} /> {/* Admin chat interface */}
        <Route path="/chat" element={<Chat />} /> {/* User chat interface */}

        {/* User Registration and Login */}
        <Route path="/user/register" element={<UserRegister />} /> {/* User registration */}
        <Route path="/user/login" element={<UserLogin />} /> {/* User login */}
      </Routes>
    </Router>
  );
}

export default App;
