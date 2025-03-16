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
    </div>
  );
};

export default ArtistProfile;
