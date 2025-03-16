import React from "react";

const Dashboard = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // Fetch bookings

  if (bookings.length === 0) {
    return (
      <div className="container mt-5">
        <h2>My Dashboard</h2>
        <p>No bookings found. Start by booking an appointment!</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>My Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.artist}</td>
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>Confirmed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
