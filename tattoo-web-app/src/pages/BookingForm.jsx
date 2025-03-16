import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { artists } from "../data/artists";

const BookingForm = () => {
  const { id } = useParams(); // Get artist ID from URL
  const navigate = useNavigate();
  const location = useLocation(); // Access data passed from "Edit"

  // Find the artist using the artist ID
  const artist = artists.find((artist) => artist.id === parseInt(id));

  // Extract booking details if editing
  const editingData = location.state || {}; // If editing, booking data will be here
  const [name, setName] = useState(editingData.name || ""); // Pre-fill if editing
  const [email, setEmail] = useState(editingData.email || "");
  const [date, setDate] = useState(editingData.date || "");
  const [time, setTime] = useState(editingData.time || "");
  const [notes, setNotes] = useState(editingData.notes || "");
  const [index, setIndex] = useState(editingData.index); // Booking index, if editing

  // Utility to format a date as YYYY-MM-DD
  const formatDate = (inputDate) => {
    return new Date(inputDate).toISOString().split("T")[0];
  };

  // Check if a date is valid based on availability (open and blocked)
  const isDateBlocked = (selectedDate) => {
    const formattedDate = formatDate(selectedDate);
    console.log("Checking availability for date:", formattedDate);
    // Blocked dates override open dates
    if (artist.availability.blocked.includes(formattedDate)) return true;

    // If `open` dates are defined, allow only those dates
    if (
      artist.availability.open &&
      !artist.availability.open.includes(formattedDate)
    ) {
      return true; // If not in the open array, block it
    }

    // Otherwise, the date is valid
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if the selected date is unavailable
    if (isDateBlocked(date)) {
      alert("Selected date is unavailable. Please choose a different date.");
      return;
    }

    const bookingDetails = {
      artistId: artist.id, // Ensure the artist ID is included
      artist: artist.name,
      name,
      email,
      date,
      time,
      notes,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    if (index !== undefined) {
      // Update the existing booking
      existingBookings[index] = bookingDetails;
    } else {
      // Add new booking
      existingBookings.push(bookingDetails);
    }
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    // Redirect to confirmation page
    navigate("/booking-confirmation", { state: bookingDetails });
  };

  if (!artist) {
    return (
      <div className="container mt-5">
        <h2>Artist Not Found</h2>
        <p>
          Oops! The artist you're booking with does not exist. Please go back and try again.
        </p>
        <button
          onClick={() => navigate("/artists")}
          className="btn btn-secondary"
        >
          Back to Artists
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>{index !== undefined ? "Edit" : "Book"} an Appointment with {artist.name}</h2>
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
            min={formatDate(new Date())} // Disable past dates
            required
          />
          {date && isDateBlocked(date) && (
            <p className="text-danger mt-2">
              This date is unavailable. Please choose another date.
            </p>
          )}
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
          {index !== undefined ? "Save Changes" : "Submit Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
