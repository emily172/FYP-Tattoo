/*import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles"; // Import articles data

const BlogDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const article = articles.find((a) => a.id === parseInt(id)); // Find the article

  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(""); // State for new comment
  const [rating, setRating] = useState(null); // State for current rating
  const [ratings, setRatings] = useState([]); // State for all submitted ratings

  // Load comments and ratings from localStorage
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
    const storedRatings = JSON.parse(localStorage.getItem(`ratings_${id}`)) || [];
    setComments(storedComments);
    setRatings(storedRatings);
  }, [id]);

  // Save comments and ratings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
    localStorage.setItem(`ratings_${id}`, JSON.stringify(ratings));
  }, [comments, ratings, id]);

  // Handle posting a comment and rating together
  const handleAddCommentAndRating = () => {
    if (newComment.trim() !== "" && rating !== null) {
      const newEntry = { text: newComment, rating, date: new Date() };
      setComments([...comments, newEntry]); // Add new comment and rating
      setRatings([...ratings, rating]); // Save rating separately for averaging
      setNewComment(""); // Clear comment input
      setRating(null); // Clear rating input
    } else {
      alert("You must provide both a rating and a comment.");
    }
  };

  // Calculate average rating
  const getAverageRating = () => {
    if (ratings.length === 0) return "No ratings yet";
    const average = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
    return average.toFixed(1);
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
    <div className="container mt-5">*/
      {/* Article Details */}
      /*<h2>{article.title}</h2>
      <p className="text-muted">
        By {article.author} | {article.date} | {article.category}
      </p>
      <p>{article.content}</p>*/

      {/* Tags */}
      /*{article.tags && (
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
*/
      {/* Rating and Comment Feature */}
     /* <div className="mt-4">
        <h4>Rate and Comment on this Article</h4>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#ffc107" : "#e4e5e9",
                fontSize: "1.5rem",
              }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="form-control mt-3"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="btn btn-primary mt-2"
          onClick={handleAddCommentAndRating}
          disabled={!newComment.trim() || rating === null}
        >
          Post Comment and Rating
        </button>
        <div className="mt-2">
          <strong>Average Rating:</strong> {getAverageRating()}
        </div>
      </div>
*/
      {/* Comment Section */}
      /*<div className="mt-5">
        <h4>Comments</h4>
        {comments.length > 0 ? (
          <ul className="list-group">
            {comments.map((comment, index) => (
              <li key={index} className="list-group-item">
                <strong>Rating:</strong> {"⭐".repeat(comment.rating)}
                <br />
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
      </div>
*/
      {/* Related Articles Section */}
      /*<div className="mt-5">
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
*/
      {/* Social Media Sharing */}
     /* <div className="mt-5">
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
*/
      {/* Back to Blog Link */}
    /*  <Link to="/blog" className="btn btn-secondary mt-4">
        Back to Blog
      </Link>
    </div>
  );
};

export default BlogDetail;*/
