import React from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";

const BlogDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const article = articles.find((a) => a.id === parseInt(id)); // Find the article

  if (!article) {
    return (
      <div className="container mt-5">
        <h2>Article Not Found</h2>
        <p>We couldn't find the article you were looking for.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>{article.title}</h2>
      <p className="text-muted">
        By {article.author} | {article.date} | {article.category}
      </p>
      <p>{article.content}</p>
      <Link to="/blog" className="btn btn-secondary mt-3">Back to Blog</Link>
    </div>
  );
};

export default BlogDetail;
