import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faFilter } from '@fortawesome/free-solid-svg-icons';

function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch FAQs from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/faqs')
      .then((response) => {
        const faqData = response.data.map((faq) => ({ ...faq, isOpen: false }));
        setFaqs(faqData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs.');
        setLoading(false);
      });
  }, []);

  // Toggle the visibility of answers
  const toggleAnswer = (id) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) => (faq._id === id ? { ...faq, isOpen: !faq.isOpen } : faq))
    );
  };

  // Filter FAQs based on search term and category
  const filteredFAQs = faqs
    .filter((faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((faq) =>
      selectedCategory === 'All Categories' || faq.category === selectedCategory
    );

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-900 via-gray-800 to-black p-8">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-100 tracking-wide mb-8 drop-shadow-lg">
        Frequently Asked Questions
      </h1>

      {/* Filtering Options */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-full shadow-md px-4 py-3">
          <FontAwesomeIcon icon={faFilter} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Category Dropdown */}
{/* Category Dropdown */}
<div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-200 px-4 py-2 rounded-lg shadow-md">
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="bg-transparent text-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:text-indigo-300"
  >
    <option value="All Categories">All Categories</option>
    {Array.from(new Set(faqs.map((faq) => faq.category))).map((category) => (
      <option key={category} value={category} className="bg-gray-800 text-gray-200">
        {category}
      </option>
    ))}
  </select>
</div>


      </div>

      {/* Loading Spinner */}
      {loading && (
        <p className="text-center text-yellow-500 text-lg animate-pulse">
          Loading FAQs...
        </p>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {/* FAQ List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredFAQs.map((faq) => (
          <div
            key={faq._id}
            className="rounded-lg shadow-lg p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl backdrop-blur-md"
          >
            {/* Question */}
            <button
              onClick={() => toggleAnswer(faq._id)}
              className="w-full flex justify-between items-center text-left text-xl font-semibold text-indigo-400 hover:text-indigo-300 focus:outline-none transition"
            >
              <span>{faq.question}</span>
              <FontAwesomeIcon
                icon={faq.isOpen ? faChevronUp : faChevronDown}
                className="text-2xl"
              />
            </button>

            {/* Animated Answer */}
            <p
              className={`mt-4 text-gray-300 leading-relaxed transition-all duration-500 ${faq.isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
                }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;
