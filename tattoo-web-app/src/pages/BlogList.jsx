import React, { useState } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles"; // Import articles data

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category filter

  // Get unique categories from articles
  const uniqueCategories = [...new Set(articles.map((article) => article.category))];

  // Filter articles based on search query and selected category
  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === "" || article.category === selectedCategory) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

      {/* List of Filtered Articles */}
      <div className="row">
        {filteredArticles.map((article) => (
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
        {filteredArticles.length === 0 && (
          <div className="text-center">
            <p>No articles found. Try searching or selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
