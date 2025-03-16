import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { artists } from "../data/artists";

const ReviewForm = () => {
  const { id } = useParams(); // Get artist ID from URL
  const navigate = useNavigate();

  // Find the artist by their ID
  const artist = artists.find((artist) => artist.id === parseInt(id));

  // State for review form inputs
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5); // Default rating is 5
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new review object
    const newReview = { username, rating: parseInt(rating), comment };

    // Add the review to the artist's reviews array
    if (artist) {
      artist.reviews = artist.reviews || []; // Ensure reviews array exists
      artist.reviews.push(newReview);
      localStorage.setItem("artists", JSON.stringify(artists)); // Save updates to localStorage
      alert("Thank you for your review!");

      // Reset the form fields
      setUsername("");
      setRating(5);
      setComment("");

      // Navigate back to the artist profile
      navigate(`/artists/${artist.id}`);
    } else {
      alert("Error: Artist not found.");
    }
  };

  if (!artist) {
    return (
      <div className="container mt-5">
        <h2>Artist Not Found</h2>
        <p>The artist you're trying to review does not exist.</p>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/artists")}
        >
          Back to Artists
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Leave a Review for {artist.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Comments</label>
          <textarea
            className="form-control"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
