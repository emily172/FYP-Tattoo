import React, { useState } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles"; // Import articles data

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [sortOption, setSortOption] = useState("newest"); // State to store sorting option

  // Filter articles based on search query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort articles based on selected sorting option
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date); // Sort by newest
    } else if (sortOption === "oldest") {
      return new Date(a.date) - new Date(b.date); // Sort by oldest
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title); // Sort alphabetically by title
    } else if (sortOption === "category") {
      return a.category.localeCompare(b.category); // Sort alphabetically by category
    }
    return 0; // Default sorting
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Blog & Articles</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search articles by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sorting Options */}
      <div className="mb-4">
        <label className="form-label me-3">Sort By:</label>
        <select
          className="form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* List of Filtered and Sorted Articles */}
      <div className="row">
        {sortedArticles.map((article) => (
          <div key={article.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <p className="text-muted">
                  <small>
                    By {article.author} | {article.date} | {article.category}
                  </small>
                </p>
                <Link to={`/blog/${article.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
        {sortedArticles.length === 0 && (
          <div className="text-center">
            <p>No articles found. Try searching with a different keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
