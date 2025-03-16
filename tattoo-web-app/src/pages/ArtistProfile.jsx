import React from "react";
import { useParams, Link } from "react-router-dom";
import { artists } from "../data/artists";

const ArtistProfile = () => {
  // Get artist ID from URL
  const { id } = useParams();
  const artist = artists.find((artist) => artist.id === parseInt(id));

  if (!artist) {
    return (
      <div className="container mt-5">
        <h2>Artist Not Found</h2>
        <p>Oops! The artist you're looking for does not exist.</p>
      </div>
    );
  }

  // Helper function to calculate the average rating
  const getAverageRating = (reviews) => {
    if (reviews.length === 0) return "No reviews yet"; // No reviews available
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1); // Average rating with 1 decimal
  };

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
            <strong>Average Rating:</strong>{" "}
            {getAverageRating(artist.reviews)} ⭐
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
        {artist.reviews && artist.reviews.length > 0 ? (
          artist.reviews.map((review, index) => (
            <div key={index} className="mb-3">
              <p>
                <strong>{review.username}</strong> rated it {review.rating} ⭐
              </p>
              <p>{review.comment}</p>
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
