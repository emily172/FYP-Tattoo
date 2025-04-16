import React, { useState } from 'react';
import axios from 'axios';

function TattooCard({ tattoo }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState({ user: '', rating: '', comment: '' });

  const handleReviewSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/tattoos/${tattoo._id}/reviews`, review);
      alert('Review added successfully!');
      setReview({ user: '', rating: '', comment: '' }); // Reset form
      setShowReviewForm(false); // Hide form
    } catch (err) {
      console.error('Error adding review:', err);
      alert('Failed to add review.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transform hover:scale-105 transition">
      <img src={tattoo.image} alt={tattoo.name} className="w-full h-48 object-cover rounded-lg" />
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-800">{tattoo.name}</h2>
        <p className="text-gray-600 mt-2">Average Rating: 4.5</p> {/* Replace with dynamic rating */}

        <button
          className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Cancel' : 'Leave a Review'}
        </button>

        {showReviewForm && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Your Name"
              value={review.user}
              onChange={(e) => setReview({ ...review, user: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <select
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <textarea
              placeholder="Your Review"
              value={review.comment}
              onChange={(e) => setReview({ ...review, comment: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TattooCard;
