import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import History from "./pages/History";
import TatStyles from "./pages/TatStyles";
import Gallery from "./pages/Gallery"; // Import the Gallery component
import Category from "./pages/Category";
import Design from "./pages/Design"
import CoverUp from "./pages/CoverUp";
import Artists from "./pages/Artists";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistSpotlight from "./pages/artistSpotlight";
import FAQResources from "./pages/FAQResources";
import Aftercare from "./pages/Aftercare";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import ReviewForm from "./pages/ReviewForm";
import Dashboard from "./pages/Dashboard";
import BookingForm from "./pages/BookingForm";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Import Toastify CSS
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <Router>
      {/* Flexbox layout for the whole app */}
      <div className="d-flex flex-column min-vh-100">
        <Header /> {/* Always at the top */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/history" element={<History />} />
            <Route path="/tatstyles" element={<TatStyles />} />
            <Route path="/gallery" element={<Gallery />} /> {/* Gallery Route */}
            <Route path="/category" element={<Category/>} />
            <Route path="/design" element={<Design/>} />
            <Route path="/coverups" element={<CoverUp/>} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistProfile />} />
            <Route path="/artists/:id/book" element={<BookingForm />} />
            <Route path="/artists/:id/review" element={<ReviewForm />} />
            <Route path="/artist-spotlight" element={<ArtistSpotlight />} />
            <Route path="/faq-resources" element={<FAQResources />} />
            <Route path="/aftercare" element={<Aftercare />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/my-bookings" element={<MyBookings />} /> {/* My Bookings */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          {/* Global Toastify Notifications */}
          <ToastContainer />
        </main>
        <Footer /> {/* Always at the bottom */}
      </div>
    </Router>
  );
};

export default App;
