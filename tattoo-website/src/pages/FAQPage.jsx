import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Filter FAQs based on the search term
  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center mb-8 text-indigo-800 shadow-sm">
        Frequently Asked Questions
      </h1>

      {/* Enhanced Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-full shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center text-lg text-gray-500">Loading FAQs...</div>}

      {/* Error Message */}
      {error && <p className="text-center text-red-600 text-lg">{error}</p>}

      {/* FAQ List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredFAQs.map((faq) => (
          <div
            key={faq._id}
            className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out hover:shadow-xl"
          >
            {/* Question */}
            <button
              onClick={() => toggleAnswer(faq._id)}
              className="w-full flex justify-between items-center text-left font-semibold text-indigo-700 hover:text-indigo-500 focus:outline-none"
            >
              <span>{faq.question}</span>
              <FontAwesomeIcon
                icon={faq.isOpen ? faChevronUp : faChevronDown}
                className="text-xl"
              />
            </button>

            {/* Animated Answer */}
            <p
              className={`mt-4 text-gray-700 border-l-2 border-indigo-500 pl-4 overflow-hidden transition-all duration-500 ${
                faq.isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
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
