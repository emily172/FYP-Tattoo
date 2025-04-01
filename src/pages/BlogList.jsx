import React, { useState } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles"; // Import articles data
import "../styles/BlogList.css"; // Import CSS for styling

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category filtering
  const [sortOption, setSortOption] = useState("newest"); // State for sorting
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const articlesPerPage = 4; // Number of articles per page

  // Get unique categories from articles
  const uniqueCategories = [...new Set(articles.map((article) => article.category))];

  // Filter articles by search query and selected category
  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === "" || article.category === selectedCategory) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort articles based on the selected sorting option
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Featured Articles: Filter the first 2 articles from the filtered and sorted list
  const featuredArticles = sortedArticles.slice(0, 2);

  // Get article counts by category
  const categoryCounts = uniqueCategories.map((category) => ({
    category,
    count: articles.filter((article) => article.category === category).length,
  }));

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Blog & Articles</h2>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
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
            <div className="d-flex flex-column">
              <button
                className={`btn btn-outline-primary mb-2 ${
                  selectedCategory === "" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>
              {categoryCounts.map(({ category, count }) => (
                <button
                  key={category}
                  className={`btn btn-outline-primary mb-2 ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
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
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          {/* Featured Articles */}
          <div className="mb-4">
            <h3 className="text-center">Featured Articles</h3>
            <div className="row">
              {featuredArticles.map((article) => (
                <div key={article.id} className="col-md-6 mb-4">
                  <div className="card border-info">
                    <div className="card-body">
                      <h5 className="card-title">{article.title}</h5>
                      <p className="card-text">{article.description}</p>
                      <Link to={`/blog/${article.id}`} className="btn btn-info">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {featuredArticles.length === 0 && (
                <div className="text-center">
                  <p>No featured articles match your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Paginated Articles */}
          <div className="row">
            {paginatedArticles.map((article) => (
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
            {paginatedArticles.length === 0 && (
              <div className="text-center">
                <p>No articles found. Try searching or selecting a different category.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-secondary me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
