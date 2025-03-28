import React from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";

const BlogList = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Blog & Articles</h2>
      <div className="row">
        {articles.map((article) => (
          <div key={article.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <p className="text-muted">
                  <small>By {article.author} | {article.date}</small>
                </p>
                <Link to={`/blog/${article.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
