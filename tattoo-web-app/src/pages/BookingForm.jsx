import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { artists } from "../data/artists";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const artist = artists.find((artist) => artist.id === parseInt(id));// Get artist ID from URL

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  // Track validation errors - Error Handling
  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Date validation
    if (!date) {
      newErrors.date = "Please select a date.";
    } else if (new Date(date) < new Date()) {
      newErrors.date = "The selected date cannot be in the past.";
    }

    // Time validation
    if (!time) {
      newErrors.time = "Please select a time.";
    }
    // Return true if no errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (validateForm()) {
      const bookingDetails = {
        artist: artist.name,
        name,
        email,
        date,
        time,
        notes,
      };

      // Save booking to localStorage
      const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const updatedBookings = [...existingBookings, bookingDetails];
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));

      // Navigate to confirmation page with booking details
      navigate("/booking-confirmation", { state: bookingDetails });
    }
  };

  if (!artist) {
    return (
      <div className="container mt-5">
        <h2>Artist Not Found</h2>
        <p>Oops! The artist you're booking with does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Book an Appointment with {artist.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`} //Check if the Name is valid to pass through
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/**If not valid pass in information to explain why and action to take */}
          {errors.name && <div className="invalid-feedback">{errors.name}</div>} 
        </div>

        <div className="mb-3">
          <label className="form-label">Your Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}//Check if the Email is valid to pass through
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           {/**If not valid pass in information to explain why and action to take */}
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Preferred Date</label>
          <input
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}  //Check if the Email is valid to pass through
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
           {/**If not valid pass in information to explain why and action to take */}
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Preferred Time</label>
          <input
            type="time"
            className={`form-control ${errors.time ? "is-invalid" : ""}`}  //Check if the Email is valid to pass through
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
           {/**If not valid pass in information to explain why and action to take */}
          {errors.time && <div className="invalid-feedback">{errors.time}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Additional Notes</label>
          <textarea
            className="form-control"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
