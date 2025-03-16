import React, { useState } from "react";
import { artists } from "../data/artists";

const Artists = () => {
  const [search, setSearch] = useState(""); // Search bar state
  const [specialty, setSpecialty] = useState(""); // Filter state

  // Filter artists based on the search term and specialty
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase()) &&
      (specialty === "" || artist.specialty === specialty)
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Our Artists</h2>
      <p>Explore profiles of skilled tattoo artists.</p>

      {/* Search and Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          <option value="Geometric Tattoos">Geometric Tattoos</option>
          <option value="Blackwork Tattoos">Blackwork Tattoos</option>
          <option value="Realism Tattoos">Realism Tattoos</option>
        </select>
      </div>

      {/* Display Filtered Artists */}
      <div className="row">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div className="col-md-4 mb-4" key={artist.id}>
              <div className="card">
                <img
                  src={artist.image || "https://placehold.co/350x200"}
                  alt={artist.name || "Artist"}
                  className="card-img-top"
                  style={{
                    objectFit: "cover", // Ensures image proportions remain consistent
                    height: "200px",
                    width: "100%",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{artist.name}</h5>
                  <p>{artist.specialty}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No artists match your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
