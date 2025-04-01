import React, { useState } from "react";
import "../styles/Booking.css"; // Import CSS for styling

const Booking = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      tattooIdea: "",
      referenceImages: [],
      artistPreference: "",
      date: "",
      time: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormSubmitted(true);
      console.log("Booking Details:", formData); // Log booking details
      setFormData({
        name: "",
        email: "",
        tattooIdea: "",
        referenceImages: [],
        artistPreference: "",
        date: "",
        time: "",
      }); // Reset form
    };
  
    const handleFileUpload = (e) => {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, referenceImages: files });
    };
  
    const artists = [
      { id: 1, name: "John Doe", specialty: "Realism" },
      { id: 2, name: "Jane Smith", specialty: "Traditional" },
      { id: 3, name: "Chris Evans", specialty: "Watercolor" },
    ];
  
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="display-4 mb-4">Book an Appointment or Virtual Consultation</h1>
          <p className="lead text-muted">
            Schedule your tattoo session or a virtual consultation with one of our talented artists.
          </p>
        </div>
        {formSubmitted ? (
          <div className="text-success text-center">
            <h4>Thank you for your request! We’ll confirm your booking or consultation soon.</h4>
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
              <label className="form-label">Describe Your Tattoo Idea</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.tattooIdea}
                onChange={(e) => setFormData({ ...formData, tattooIdea: e.target.value })}
                placeholder="Share details about your idea (e.g., style, placement, theme)."
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Reference Images</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileUpload}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Preferred Artist</label>
              <select
                className="form-select"
                value={formData.artistPreference}
                onChange={(e) => setFormData({ ...formData, artistPreference: e.target.value })}
              >
                <option value="" disabled>Select an artist (optional)</option>
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
            <button type="submit" className="btn btn-primary">Submit Booking or Consultation</button>
          </form>
        )}
      </div>
    );
  };

export default Booking;
