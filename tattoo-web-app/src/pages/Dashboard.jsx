import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css"


const Dashboard = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // Retrieve bookings from localStorage
  const [filter, setFilter] = useState("all"); // Track filter selection
  const navigate = useNavigate();

  // Filter bookings based on user selection
  const filteredBookings = bookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.date);

    if (filter === "upcoming") return bookingDate >= today;
    if (filter === "past") return bookingDate < today;
    return true; // Default: show all bookings
  });

  // Show a notification (e.g., for deleted bookings)
  const showNotification = (message) => {
    toast.success(message, { autoClose: 2000 });
  };

  if (bookings.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Dashboard</h2>
        <p>No bookings found. Start by booking an appointment!</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      {/* Summary Section */}
      <div className="row mb-4">
        <div className="col-md-2">
          <div className="card text-white bg-primary text-center">
            <div className="card-body">
              <h5 className="card-title">Total Bookings</h5>
              <p className="card-text">{bookings.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-white bg-success text-center">
            <div className="card-body">
              <h5 className="card-title">Upcoming</h5>
              <p className="card-text">
                {bookings.filter((b) => new Date(b.date) >= new Date()).length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-white bg-warning text-center">
            <div className="card-body">
              <h5 className="card-title">Past</h5>
              <p className="card-text">
                {bookings.filter((b) => new Date(b.date) < new Date()).length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-white bg-info text-center">
            <div className="card-body">
              <h5 className="card-title">Completed</h5>
              <p className="card-text">
                {bookings.filter((b) => b.status === "Completed").length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-white bg-secondary text-center">
            <div className="card-body">
              <h5 className="card-title">Confirmed</h5>
              <p className="card-text">
                {bookings.filter((b) => b.status === "Confirmed").length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-white bg-danger text-center">
            <div className="card-body">
              <h5 className="card-title">Cancelled</h5>
              <p className="card-text">
                {bookings.filter((b) => b.status === "Cancelled").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-3">
        <label htmlFor="filter" className="form-label">Filter Bookings:</label>
        <select
          id="filter"
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.artist}</td>
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>
                  <select
                    className="form-select"
                    title="Update booking status"
                    value={booking.status || "Confirmed"}
                    onChange={(e) => {
                      const updatedBookings = [...bookings];
                      updatedBookings[index].status = e.target.value;
                      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
                      showNotification("Booking status updated!");
                      window.location.reload();
                    }}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  {/* Edit Button */}
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      navigate(`/artists/${booking.artistId}/book`, {
                        state: { ...booking, index },
                      })
                    }
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const updatedBookings = bookings.filter((_, i) => i !== index);
                      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
                      showNotification("Booking deleted successfully!");
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
