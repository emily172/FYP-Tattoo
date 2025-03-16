import React from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="container mt-5">
      {/* Artist Details Section */}
      <div className="row">
        <div className="col-md-4">
          <img
            src={artist.image || "https://via.placeholder.com/350x200"}
            alt={artist.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h2>{artist.name}</h2>
          <p><strong>Specialty:</strong> {artist.specialty}</p>
          <p><strong>Bio:</strong> {artist.bio || "This artist has not added a biography yet."}</p>
        </div>
      </div>
       {/* Portfolio Section */}
       <div className="row">
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

    </div>
  );
};

export default ArtistProfile;
