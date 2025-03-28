import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FAQResources.css";


const faqs = [
  {
    question: "How do I prepare for a tattoo session?",
    answer:
      "Before a tattoo session, ensure you are well-hydrated, have eaten a full meal, and are wearing comfortable clothing. Avoid alcohol or blood thinners prior to your appointment.",
  },
  {
    question: "How should I take care of my tattoo after the session?",
    answer:
      "Keep your tattoo clean and moisturized. Avoid soaking it in water, exposing it to direct sunlight, or picking at scabs as it heals.",
  },
  {
    question: "Does getting a tattoo hurt?",
    answer:
      "Pain levels vary depending on the location of the tattoo and individual tolerance. Areas with more nerve endings or thinner skin are generally more sensitive.",
  },
];

const resources = [
  { title: "Tattoo Aftercare Tips", link: "https://www.setu.ie/" },
  { title: "Choosing the Right Tattoo Design", link: "https://www.setu.ie/" },
  { title: "Tattoo Safety Guidelines", link: "https://www.setu.ie/" },
];

const FAQResources = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">FAQ & Resources</h2>

      {/* FAQ Section */}
      <div className="mb-5">
        <h3 className="mb-3">Frequently Asked Questions</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="accordion" id="faqAccordion">
          {filteredFaqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="true"
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Section */}
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
