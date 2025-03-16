import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Artists from "./pages/Artists";
import Login from "./pages/Login"; // Import Login page
import Signup from "./pages/Signup"; // Import Signup page

const App = () => {
  return (
    <Router>
      <div>
        <Header /> {/* Header appears on all pages */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/signup" element={<Signup />} /> {/* Signup route */}
          </Routes>
        </main>
        <Footer /> {/* Footer appears on all pages */}
      </div>
    </Router>
  );
};

export default App;
