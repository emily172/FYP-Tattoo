import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles"; // Import articles data

const BlogDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const article = articles.find((a) => a.id === parseInt(id)); // Find the article

  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for new comment
  const [rating, setRating] = useState(null); // State for current rating
  const [ratings, setRatings] = useState([]); // State for list of ratings

  // Handle adding a comment
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, date: new Date() }]);
      setNewComment(""); // Clear the input
    }
  };

  // Handle rating submission
  const handleRating = (rate) => {
    if (rate) {
      setRatings([...ratings, rate]);
      setRating(null); // Reset selected rating
    }
  };

  // Find related articles based on category
  const relatedArticles = articles.filter(
    (a) => a.id !== article?.id && a.category === article?.category
  );

  if (!article) {
    return (
      <div className="container mt-5">
        <h2>Article Not Found</h2>
        <p>We couldn't find the article you were looking for.</p>
        <Link to="/blog" className="btn btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Article Details */}
      <h2>{article.title}</h2>
      <p className="text-muted">
        By {article.author} | {article.date} | {article.category}
      </p>
      <p>{article.content}</p>

      {/* Tags */}
      {article.tags && (
        <div className="mt-4">
          <h4>Tags</h4>
          {article.tags.map((tag) => (
            <Link
              to={`/blog?tag=${tag}`}
              key={tag}
              className="badge bg-primary me-2 text-decoration-none"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Rating Feature */}
      <div className="mt-4">
        <h4>Rate this Article</h4>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color: star <= (rating || Math.round(ratings.reduce((a, b) => a + b, 0) / (ratings.length || 1)))
                ? "#ffc107"
                : "#e4e5e9",
              fontSize: "1.5rem",
            }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
        <button
          className="btn btn-primary ms-2"
          onClick={() => handleRating(rating)}
          disabled={!rating}
        >
          Submit Rating
        </button>
        <div className="mt-2">
          <strong>Average Rating:</strong>{" "}
          {ratings.length
            ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
            : "No ratings yet"}
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-5">
        <h4>Comments</h4>
        {comments.length > 0 ? (
          <ul className="list-group">
            {comments.map((comment, index) => (
              <li key={index} className="list-group-item">
                {comment.text}{" "}
                <small className="text-muted">
                  ({new Date(comment.date).toLocaleString()})
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No comments yet. Be the first to comment!</p>
        )}
        <textarea
          className="form-control mt-3"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="btn btn-primary mt-2"
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </div>

      {/* Related Articles Section */}
      <div className="mt-5">
        <h4>Related Articles</h4>
        <div className="row">
          {relatedArticles.length > 0 ? (
            relatedArticles.map((related) => (
              <div key={related.id} className="col-md-6 mb-4">
                <Link to={`/blog/${related.id}`} className="text-decoration-none">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{related.title}</h5>
                      <p className="card-text">{related.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-muted">No related articles available.</p>
          )}
        </div>
      </div>

      {/* Social Media Sharing */}
      <div className="mt-5">
        <h4>Share this Article</h4>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
              "_blank"
            )
          }
        >
          Share on Facebook
        </button>
        <button
          className="btn btn-outline-info me-2"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`,
              "_blank"
            )
          }
        >
          Share on Twitter
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/shareArticle?url=${window.location.href}&title=${article.title}`,
              "_blank"
            )
          }
        >
          Share on LinkedIn
        </button>
      </div>

      {/* Back to Blog Link */}
      <Link to="/blog" className="btn btn-secondary mt-4">
        Back to Blog
      </Link>
    </div>
  );
};

export default BlogDetail;
