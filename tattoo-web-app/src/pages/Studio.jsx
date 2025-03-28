import React from "react";

const Studio = () => {
  // Studio data (you can later fetch this dynamically or from props)
  const studio = {
    name: "Ink Pots Tattoo Studio",
    location: "Cork Rd, Kilbarry, Waterford",
    facilities: ["Private Rooms", "Waiting Area", "Free Wi-Fi"],
    contact: "123-456-7890",
    description:
      "Ink Pots offers top-notch tattoo services with hygienic practices and professional artists. We ensure a comfortable environment for every client.",
    gallery: [
      "https://placehold.co/300x200?text=Studio+1",
      "https://placehold.co/300x200?text=Studio+2",
      "https://placehold.co/300x200?text=Studio+3",
    ],
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
      </div>

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
