import React, { useState } from "react";

const Studio = () => {
  // Studio data (you can later fetch this dynamically or from props)
  const studio = {
    name: "Ink Pots Tattoo Studio",
    location: "Cork Rd, Kilbarry, Waterford",
    facilities: ["Private Rooms", "Waiting Area", "Free Wi-Fi"],
    contact: "123-456-7890",
    email: "contact@inkpots.com", // Added email
    description:
      "Ink Pots offers top-notch tattoo services with hygienic practices and professional artists. We ensure a comfortable environment for every client.",
    gallery: [
      "https://placehold.co/300x200?text=Studio+1",
      "https://placehold.co/300x200?text=Studio+2",
      "https://placehold.co/300x200?text=Studio+3",
    ],
    // mapLocation: "123 Main Street, Dublin", // Commented out as per request
    reviews: [
      {
        username: "Alex",
        rating: 5,
        comment: "Amazing experience!",
        timestamp: "2025-04-01T10:00:00",
      },
      {
        username: "Jamie",
        rating: 4,
        comment: "Great service but a bit pricey.",
        timestamp: "2025-03-28T15:45:00",
      },
    ],
    policies: [
      "All clients must provide a valid ID (18+ years only).",
      "Appointments must be canceled at least 24 hours in advance.",
      "No external companions allowed in the work area.",
    ],
  };

  const [formData, setFormData] = useState({ name: "", email: "", message: "" }); // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false); // Form submission status

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    console.log("Form submitted:", formData); // Simulated form submission
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  // Helper to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews.length) return "No reviews yet";
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className="container mt-5">
      <h1>{studio.name}</h1>
      <p className="text-muted">{studio.location}</p>
      <p>{studio.description}</p>

      {/* Facilities Section */}
      <div className="mt-4">
        <h4>Facilities</h4>
        <ul>
          {studio.facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
      </div>

      {/* Contact Section */}
      <div className="mt-4">
        <h4>Contact Information</h4>
        <p>
          <strong>Phone:</strong> {studio.contact}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
        </p>
      </div>

      {/* Map Section */}
      {/*
      <div className="mt-4">
        <h4>Studio Location</h4>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
            studio.mapLocation
          )}`}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Studio Location"
        ></iframe>
      </div>
      */}

      {/* Gallery Section */}
      <div className="mt-4">
        <h4>Gallery</h4>
        <div className="row">
          {studio.gallery.map((image, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <img
                src={image}
                alt={`Studio Image ${index + 1}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-4">
        <h4>Client Reviews</h4>
        <p>
          <strong>Average Rating:</strong> {calculateAverageRating(studio.reviews)} ⭐
        </p>
        {studio.reviews.length > 0 ? (
          studio.reviews.map((review, index) => (
            <div key={index} className="mb-3">
              <p>
                <strong>{review.username}</strong> rated it{" "}
                <span>{"⭐".repeat(review.rating)}</span>
              </p>
              <p>{review.comment}</p>
              <p className="text-muted">
                Reviewed on {new Date(review.timestamp).toLocaleDateString()} at{" "}
                {new Date(review.timestamp).toLocaleTimeString()}
              </p>
              <hr />
            </div>
          ))
        ) : (
          <p className="text-muted">No reviews yet.</p>
        )}
      </div>

      {/* Virtual Tour Section */}
      <div className="mt-4">
        <h4>Virtual Tour</h4>
        <p>
          Explore our studio through this virtual tour video and see what we have
          to offer!
        </p>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/sample-video"
          title="Studio Virtual Tour"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Studio Policies Section */}
      <div className="mt-4">
        <h4>Studio Policies</h4>
        <ul>
          {studio.policies.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
      </div>

      {/* Contact Form Section */}
      <div className="mt-4">
        <h4>Contact Us</h4>
        {formSubmitted ? (
          <p className="text-success">Thank you for your message! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleFormSubmit}>
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
              <label className="form-label">Your Message</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>

      {/* Booking Section */}
      <div className="mt-4">
        <h4>Book an Appointment</h4>
        <p>
          Call us or visit our studio to book your next session with our
          professional artists.
        </p>
        <a href="/bookings" className="btn btn-primary">
          Book Now
        </a>
      </div>
    </div>
  );
};

export default Studio;
