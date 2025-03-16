import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { artists } from "../data/artists";

const ArtistProfile = () => {
  const { id } = useParams(); // Get artist ID from URL
  const [artist, setArtist] = useState(null); // State to store artist data
  const [sortedReviews, setSortedReviews] = useState([]); // State for sorted reviews
  const [sortOption, setSortOption] = useState("newest"); // Default sorting option
  const [isEditing, setIsEditing] = useState(false); // Tracks if a review is being edited
  const [editingReview, setEditingReview] = useState(null); // The review being edited

  // Fetch artist data from localStorage (or fallback to the default array)
  useEffect(() => {
    const storedArtists = JSON.parse(localStorage.getItem("artists")) || artists;
    const selectedArtist = storedArtists.find((a) => a.id === parseInt(id));
    setArtist(selectedArtist); // Set the selected artist data
    if (selectedArtist) {
      setSortedReviews(selectedArtist.reviews || []); // Initialize reviews
    }
  }, [id]);

  // Handle sorting reviews
  useEffect(() => {
    if (artist) {
      let reviews = [...artist.reviews];
      if (sortOption === "newest") {
        reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } else if (sortOption === "oldest") {
        reviews.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      } else if (sortOption === "highest") {
        reviews.sort((a, b) => b.rating - a.rating);
      } else if (sortOption === "lowest") {
        reviews.sort((a, b) => a.rating - b.rating);
      }
      setSortedReviews(reviews);
    }
  }, [sortOption, artist]);

  // Helper function to calculate the ratings breakdown
  const getRatingsBreakdown = (reviews) => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      breakdown[review.rating] = (breakdown[review.rating] || 0) + 1;
    });
    return breakdown;
  };

  // Delete a review
  const handleDeleteReview = (index) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const updatedReviews = sortedReviews.filter((_, i) => i !== index);
      setSortedReviews(updatedReviews); // Update state
      const updatedArtist = { ...artist, reviews: updatedReviews };
      setArtist(updatedArtist);

      // Persist changes to localStorage
      const storedArtists = JSON.parse(localStorage.getItem("artists")) || artists;
      const updatedArtists = storedArtists.map((a) =>
        a.id === artist.id ? updatedArtist : a
      );
      localStorage.setItem("artists", JSON.stringify(updatedArtists));
    }
  };

  // Edit a review
  const handleEditReview = (index) => {
    setIsEditing(true);
    setEditingReview({ ...sortedReviews[index], index });
  };

  // Submit the edited review
  const handleEditSubmit = (updatedReview) => {
    const updatedReviews = sortedReviews.map((review, i) =>
      i === updatedReview.index ? updatedReview : review
    );
    setSortedReviews(updatedReviews); // Update state
    const updatedArtist = { ...artist, reviews: updatedReviews };
    setArtist(updatedArtist);

    // Persist changes to localStorage
    const storedArtists = JSON.parse(localStorage.getItem("artists")) || artists;
    const updatedArtists = storedArtists.map((a) =>
      a.id === artist.id ? updatedArtist : a
    );
    localStorage.setItem("artists", JSON.stringify(updatedArtists));

    setIsEditing(false);
    setEditingReview(null);
  };

  const ratingsBreakdown = getRatingsBreakdown(artist?.reviews || []);
  const totalReviews = artist?.reviews?.length || 0;

  if (!artist) {
    return (
      <div className="container mt-5">
        <h2>Artist Not Found</h2>
        <p>Oops! The artist you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Artist Details Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            src={artist.image || "https://via.placeholder.com/350x200"}
            alt={artist.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h2>{artist.name}</h2>
          <p>
            <strong>Specialty:</strong> {artist.specialty}
          </p>
          <p>
            <strong>Bio:</strong> {artist.bio || "This artist has not added a biography yet."}
          </p>
          <p>
            <strong>Average Rating:</strong> {totalReviews > 0 ? `${getRatingsBreakdown(artist.reviews)} ⭐` : "No Reviews"}
          </p>
          <div>
            <Link to={`/artists/${artist.id}/book`} className="btn btn-primary mt-3">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Ratings Breakdown */}
      <div className="mb-4">
        <h5>Ratings Breakdown</h5>
        {Object.entries(ratingsBreakdown).map(([rating, count]) => {
          const percentage = totalReviews ? ((count / totalReviews) * 100).toFixed(1) : 0;
          return (
            <div key={rating} className="d-flex align-items-center mb-2">
              <span style={{ width: "50px" }}>{rating} ⭐</span>
              <div className="progress flex-grow-1 mx-2" style={{ height: "20px" }}>
                <div
                  className={`progress-bar progress-bar-striped bg-${
                    rating >= 4 ? "success" : rating === 3 ? "warning" : "danger"
                  }`}
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {percentage}%
                </div>
              </div>
              <span>{count}</span>
            </div>
          );
        })}
      </div>

      {/* Reviews Section */}
      <div className="mb-3">
        <label htmlFor="sortReviews" className="form-label">Sort Reviews</label>
        <select
          id="sortReviews"
          className="form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      {sortedReviews.length > 0 ? (
        sortedReviews.map((review, index) => (
          <div key={index} className="mb-3">
            {isEditing && editingReview.index === index ? (
              <EditReviewForm review={editingReview} onSubmit={handleEditSubmit} />
            ) : (
              <>
                <p>
                  <strong>{review.username}</strong> rated it {review.rating} ⭐
                </p>
                <p>{review.comment}</p>
                <p><small><em>Reviewed on {review.timestamp}</em></small></p>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditReview(index)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteReview(index)}>Delete</button>
                </div>
                <hr />
              </>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to leave a review!</p>
      )}

      <div className="mt-4">
        <Link to={`/artists/${artist.id}/review`} className="btn btn-secondary">Leave a Review</Link>
      </div>
    </div>
  );
};

// Component for editing a review
const EditReviewForm = ({ review, onSubmit }) => {
  const [updatedRating, setUpdatedRating] = useState(review.rating); // Local state for the updated rating
  const [updatedComment, setUpdatedComment] = useState(review.comment); // Local state for the updated comment

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // Submit updated review back to the parent component
    onSubmit({
      ...review, // Maintain existing properties (e.g., username, timestamp)
      rating: updatedRating, // Update the rating
      comment: updatedComment, // Update the comment
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <label className="form-label">Edit Rating</label>
        <select
          className="form-select"
          value={updatedRating}
          onChange={(e) => setUpdatedRating(parseInt(e.target.value))}
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Edit Comment</label>
        <textarea
          className="form-control"
          rows="3"
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-sm me-2">
        Save Changes
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => onSubmit(null)} // Cancel editing
      >
        Cancel
      </button>
    </form>
  );
};

export default ArtistProfile;
