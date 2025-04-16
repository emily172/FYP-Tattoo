/*import React from "react";
import { useLocation } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation(); // Access the data passed via state
  const bookingDetails = location.state; // Booking details

  if (!bookingDetails) {
    return (
      <div className="container mt-5">
        <h2>Booking Confirmation</h2>
        <p>It seems like no booking data was passed. Please try booking again.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Booking Confirmed!</h2>
      <p>Thank you for booking with us. Here are your booking details:</p>
      <ul>
        <li><strong>Artist:</strong> {bookingDetails.artist}</li>
        <li><strong>Your Name:</strong> {bookingDetails.name}</li>
        <li><strong>Your Email:</strong> {bookingDetails.email}</li>
        <li><strong>Date:</strong> {bookingDetails.date}</li>
        <li><strong>Time:</strong> {bookingDetails.time}</li>
        {bookingDetails.notes && (
          <li><strong>Additional Notes:</strong> {bookingDetails.notes}</li>
        )}
      </ul>
      <p>We look forward to seeing you!</p>
    </div>
  );
};

export default BookingConfirmation;
*/