import React, { useState } from "react";
import "../styles/Booking.css"; // Import CSS for styling

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    artist: "",
    date: "",
    time: "",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    console.log("Booking Details:", formData); // Log booking details for now
    setFormData({ name: "", email: "", artist: "", date: "", time: "", notes: "" }); // Reset form
  };

  const artists = [
    { id: 1, name: "John Doe", specialty: "Realism" },
    { id: 2, name: "Jane Smith", specialty: "Traditional" },
    { id: 3, name: "Chris Evans", specialty: "Watercolor" },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">Book an Appointment</h1>
        <p className="lead text-muted">
          Schedule your tattoo session with one of our talented artists.
        </p>
      </div>
      {formSubmitted ? (
        <div className="text-success text-center">
          <h4>Thank you for booking with us! We'll confirm your appointment soon.</h4>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select an Artist</label>
            <select
              className="form-select"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              required
            >
              <option value="" disabled>Select an artist</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.name}>
                  {artist.name} - {artist.specialty}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Time</label>
            <input
              type="time"
              className="form-control"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Notes</label>
            <textarea
              className="form-control"
              rows="4"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Share any specific requests or questions."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Booking</button>
        </form>
      )}
    </div>
  );
};

export default Booking;
