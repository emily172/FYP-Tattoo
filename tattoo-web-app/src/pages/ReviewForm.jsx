import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { artists } from "../data/artists"; 

const ReviewForm = () => {
  const { id } = useParams(); // Get artist ID from URL
  const navigate = useNavigate();

  // Find the artist by their ID
  const artist = artists.find((artist) => artist.id === parseInt(id));

  // State to manage the form inputs
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5); // Default rating of 5
  const [comment, setComment] = useState("");

  // State to dynamically manage artist reviews
  const [reviews, setReviews] = useState([]);

  // Load existing reviews from artist (or localStorage) when the component mounts
  useEffect(() => {
    if (artist) {
      const storedArtists = JSON.parse(localStorage.getItem("artists")) || artists; // Load artists from localStorage
      const storedArtist = storedArtists.find((a) => a.id === artist.id);
      setReviews(storedArtist?.reviews || []); // Load reviews dynamically
    }
  }, [artist]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new review object
    const newReview = {
      username,
      rating: parseInt(rating),
      comment,
    };

    // Add the new review to the current reviews state
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Persist the updated reviews to localStorage
    const storedArtists = JSON.parse(localStorage.getItem("artists")) || artists;
    const updatedArtists = storedArtists.map((a) =>
      a.id === artist.id ? { ...a, reviews: updatedReviews } : a
    );
    localStorage.setItem("artists", JSON.stringify(updatedArtists));

    alert("Thank you for your review!");

    // Reset the form fields
    setUsername("");
    setRating(5);
    setComment("");

    // Navigate back to the artist's profile page
    navigate(`/artists/${artist.id}`);
    
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
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>

      {/* Display Existing Reviews */}
      <div className="mt-5">
        <h3>Existing Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-3">
              <p>
                <strong>{review.username}</strong> rated it {review.rating} ⭐
              </p>
              <p>{review.comment}</p>
              <hr />
              <p>
                <small>
                  <em>Reviewed on {review.timestamp}</em>
                </small>
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
