import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { artists } from "../data/artists";

const BookingForm = () => {
  const { id } = useParams(); // Get artist ID from URL
  const artist = artists.find((artist) => artist.id === parseInt(id)); // Find artist by ID

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingDetails = {
      artist: artist.name,
      name,
      email,
      date,
      time,
      notes,
    };

    // Navigate to confirmation page with booking details
    navigate("/booking-confirmation", { state: bookingDetails });
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
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preferred Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preferred Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
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
