import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FAQResources.css";


const categorizedFaqs = {
    Preparation: [
      {
        question: "How do I prepare for a tattoo session?",
        answer: "Ensure you're well-rested, hydrated, and have eaten a good meal.",
      },
      {
        question: "What should I bring to my appointment?",
        answer: "Bring a valid ID, your tattoo design (if applicable), and payment.",
      },
    ],
    Aftercare: [
      {
        question: "How do I take care of a new tattoo?",
        answer: "Clean your tattoo gently with unscented soap and apply healing ointment.",
      },
      {
        question: "Can I go swimming with a new tattoo?",
        answer: "Avoid swimming or soaking your tattoo until it is fully healed.",
      },
    ],
    General: [
      {
        question: "Does getting a tattoo hurt?",
        answer: "Pain levels depend on the tattoo's location and your individual tolerance.",
      },
      {
        question: "What is the age requirement for getting a tattoo?",
        answer: "You must be at least 18 years old in most countries to get a tattoo.",
      },
    ],
  };
  
  const resources = [
    { title: "Tattoo Aftercare Tips", link: "https://example.com/aftercare" },
    { title: "Choosing the Right Tattoo Design", link: "https://example.com/design" },
    { title: "Tattoo Safety Guidelines", link: "https://example.com/safety" },
  ];
  
  const FAQResources = () => {
    const [searchQuery, setSearchQuery] = useState("");
  
    // Filter FAQs based on search query
    const filteredCategories = Object.entries(categorizedFaqs).reduce(
      (acc, [category, faqs]) => {
        const filteredFaqs = faqs.filter((faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredFaqs.length > 0) {
          acc[category] = filteredFaqs;
        }
        return acc;
      },
      {}
    );
  
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">FAQ & Resources</h2>
  
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
  
        {/* Categorized FAQ Accordion */}
        {Object.entries(filteredCategories).map(([category, faqs], categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h3>{category}</h3>
            <div className="accordion" id={`accordion-${categoryIndex}`}>
              {faqs.map((faq, faqIndex) => (
                <div className="accordion-item" key={faqIndex}>
                  <h2 className="accordion-header" id={`heading-${categoryIndex}-${faqIndex}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${categoryIndex}-${faqIndex}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${categoryIndex}-${faqIndex}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${categoryIndex}-${faqIndex}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${categoryIndex}-${faqIndex}`}
                    data-bs-parent={`#accordion-${categoryIndex}`}
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
  
        {/* Helpful Resources Section */}
        <div className="mb-5">
          <h3 className="mb-3">Helpful Resources</h3>
          <ul className="list-group">
            {resources.map((resource, index) => (
              <li key={index} className="list-group-item">
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default FAQResources;
