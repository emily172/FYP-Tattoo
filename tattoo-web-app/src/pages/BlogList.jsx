import React, { useState } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles"; // Import articles data
import "../styles/BlogList.css"// Import custom styles

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category filtering
  const [sortOption, setSortOption] = useState("newest"); // State for sorting option

  // Get unique categories from articles
  const uniqueCategories = [...new Set(articles.map((article) => article.category))];

  // Filter articles based on search query and category
  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === "" || article.category === selectedCategory) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()))
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

      {/* Category Tags */}
      <div className="mb-4">
        <h5>Filter by Category:</h5>
        <div className="d-flex flex-wrap">
          <button
            className={`btn btn-outline-primary me-2 mb-2 ${
              selectedCategory === "" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`btn btn-outline-primary me-2 mb-2 ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Options */}
      <div className="mb-4">
        <h5>Sort Articles:</h5>
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
            <p>No articles found. Try searching or selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
