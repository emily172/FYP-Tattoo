import React from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate(); // Initialize navigate
  const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // Fetch saved bookings

  // Function to handle editing
  const handleEdit = (booking, index) => {
    // Navigate to the booking form with the booking details
    navigate(`/artists/${index}/book`, { state: { ...booking, index } });
  };

  // Function to handle deleting bookings
  const handleDelete = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index); // Remove the specific booking
    localStorage.setItem("bookings", JSON.stringify(updatedBookings)); // Update localStorage
    window.location.reload(); // Refresh the page
  };

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
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.artist}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.notes || "N/A"}</td>
                <td>
                  {/* Edit Button */}
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(booking, index)}
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;