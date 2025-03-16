import React from "react";

const MyBookings = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    return (
      <div className="container mt-5">
        <h2>My Bookings</h2>
        <p>No bookings found. Start by booking an appointment!</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>My Bookings</h2>
      <ul className="list-group">
        {bookings.map((booking, index) => (
          <li key={index} className="list-group-item">
            <strong>Artist:</strong> {booking.artist} <br />
            <strong>Name:</strong> {booking.name} <br />
            <strong>Email:</strong> {booking.email} <br />
            <strong>Date:</strong> {booking.date} <br />
            <strong>Time:</strong> {booking.time} <br />
            {booking.notes && <><strong>Notes:</strong> {booking.notes}</>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
