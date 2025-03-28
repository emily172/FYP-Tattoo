import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Ink Pots</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/studio">Studio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">History</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tatstyles">Styles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/design">Design</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coverups">Cover Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/artists">Artists</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/artist-spotlight">Artist Spotlight</Link>
            </li>
            <li className="nav-item">
              <Link to="/faq-resources" className="nav-link">FAQ & Resources</Link>
            </li>
            <li className="nav-item">
              <Link to="/aftercare" className="nav-link">AfterCare</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-bookings">My Bookings</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
