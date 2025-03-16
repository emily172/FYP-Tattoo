import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { artists } from "../data/artists";

const ArtistProfile = () => {
  const { id } = useParams(); // Get artist ID from URL
  const [artist, setArtist] = useState(null); // State to store artist data
  const [sortOption, setSortOption] = useState("newest"); // Default sorting option

  // Fetch artist data from localStorage (or fallback to the default array) when the component mounts
  useEffect(() => {
    const storedArtists = JSON.parse(localStorage.getItem("artists")) || artists;
    const selectedArtist = storedArtists.find((a) => a.id === parseInt(id));
    setArtist(selectedArtist); // Set the selected artist data
  }, [id]);

  // Handle sorting reviews
  useEffect(() => {
    if (artist) {
      let sortedReviews = [...artist.reviews];
      if (sortOption === "newest") {
        sortedReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } else if (sortOption === "oldest") {
        sortedReviews.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      } else if (sortOption === "highest") {
        sortedReviews.sort((a, b) => b.rating - a.rating);
      } else if (sortOption === "lowest") {
        sortedReviews.sort((a, b) => a.rating - b.rating);
      }
      setArtist((prev) => ({ ...prev, reviews: sortedReviews })); // Update artist reviews with sorted data
    }
  }, [sortOption, artist]);

  // Helper function to calculate the average rating
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No reviews yet"; // No reviews available
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1); // Average rating with 1 decimal
  };

  // Helper function to calculate the ratings breakdown
  const getRatingsBreakdown = (reviews) => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }; // Initialize counts for each rating
    reviews.forEach((review) => {
      breakdown[review.rating] = (breakdown[review.rating] || 0) + 1;
    });
    return breakdown;
  };

  if (!artist) {
    return (
      <div className="container mt-5">
        <h2>Artist Not Found</h2>
        <p>Oops! The artist you're looking for does not exist.</p>
      </div>
    );
  }

  const ratingsBreakdown = getRatingsBreakdown(artist.reviews || []);

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
            <strong>Bio:</strong>{" "}
            {artist.bio || "This artist has not added a biography yet."}
          </p>
          <p>
            <strong>Average Rating:</strong> {getAverageRating(artist.reviews)} ⭐
          </p>
          <div>
            {/* Book Now Button */}
            <Link
              to={`/artists/${artist.id}/book`}
              className="btn btn-primary mt-3"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="row mb-5">
        <h3 className="mb-4">Portfolio</h3>
        {artist.portfolio && artist.portfolio.length > 0 ? (
          <div className="row">
            {artist.portfolio.map((image, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <img
                  src={image}
                  alt={`Portfolio Item ${index + 1}`}
                  className="img-fluid rounded"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>This artist has not uploaded any portfolio items yet.</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="row mt-5">
        <h3>Reviews</h3>

        {/* Ratings Breakdown */}
        <div className="mb-3">
          <h5>Ratings Breakdown</h5>
          <ul>
            {Object.entries(ratingsBreakdown).map(([rating, count]) => (
              <li key={rating}>
                {rating} ⭐: {count} review{count !== 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        </div>

        {/* Sorting Options */}
        <div className="mb-3">
          <label htmlFor="sortReviews" className="form-label">
            Sort Reviews
          </label>
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

        {/* Display Reviews */}
        {artist.reviews && artist.reviews.length > 0 ? (
          artist.reviews.map((review, index) => (
            <div key={index} className="mb-3">
              <p>
                <strong>{review.username}</strong> rated it {review.rating} ⭐
              </p>
              <p>{review.comment}</p>
              <p>
                <small>
                  <em>Reviewed on {review.timestamp}</em>
                </small>
              </p>
              <hr />
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {/* Leave a Review Button */}
      <div className="mt-4">
        <Link to={`/artists/${artist.id}/review`} className="btn btn-secondary">
          Leave a Review
        </Link>
      </div>
    </div>
  );
};

export default ArtistProfile;
