import React, { useState } from "react";
import { artists } from "../data/artists";

const Artists = () => {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase()) &&
      (specialty === "" || artist.specialty === specialty)
  );

  return (
    <div className="container mt-5">
      <h2>Our Artists</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          className="form-select"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          <option value="Geometric">Geometric</option>
          <option value="Blackwork">Blackwork</option>
          <option value="Realism">Realism</option>
        </select>
      </div>
      <div className="row">
        {filteredArtists.map((artist) => (
          <div className="col-md-4 mb-4" key={artist.id}>
            <div className="card">
              <img src={artist.image} className="card-img-top" alt={artist.name} />
              <div className="card-body">
                <h5 className="card-title">{artist.name}</h5>
                <p>Specialty: {artist.specialty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
