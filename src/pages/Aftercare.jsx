import React from "react";

const Aftercare = () => {
    const aftercareSteps = [
        {
          step: 1,
          title: "Keep Your Bandage On",
          description:
            "Leave the bandage or wrap on for at least 2-4 hours after getting the tattoo. This helps protect it from bacteria.",
        },
        {
          step: 2,
          title: "Wash Gently",
          description:
            "After removing the bandage, wash the tattoo gently with lukewarm water and a mild, fragrance-free soap. Avoid scrubbing.",
        },
        {
          step: 3,
          title: "Apply a Thin Layer of Ointment",
          description:
            "Use a tattoo-safe ointment recommended by your artist. Apply a very thin layer to keep the area moisturized.",
        },
        {
          step: 4,
          title: "Avoid Direct Sunlight",
          description:
            "Keep the tattoo out of direct sunlight until it's fully healed. Sun exposure can cause fading and irritation.",
        },
        {
          step: 5,
          title: "Avoid Swimming",
          description:
            "Do not submerge the tattoo in water (like pools, hot tubs, or the ocean) for at least 2 weeks to prevent infection.",
        },
      ];
    
      const tips = [
        "Avoid wearing tight clothing over the tattoo to prevent irritation.",
        "Do not pick or scratch at scabs or peeling skin; let it heal naturally.",
        "Stay hydrated to support faster healing.",
      ];
    
      const recommendedProducts = [
        { name: "Aquaphor Healing Ointment", description: "Keeps your tattoo moisturized and aids in healing." },
        { name: "Hustle Butter Deluxe", description: "A vegan-friendly moisturizer that's perfect for tattoo aftercare." },
        { name: "Cetaphil Gentle Cleanser", description: "Fragrance-free and gentle for cleaning tattoos." },
      ];
    
      return (
        <div className="container mt-5">
          <div className="text-center">
            <h1 className="display-4 mb-4">Tattoo Aftercare</h1>
            <p className="lead text-muted">Follow these steps to ensure your tattoo heals perfectly and looks amazing!</p>
          </div>
    
          {/* Aftercare Steps */}
          <div className="mt-4">
            <h4 className="text-uppercase text-primary mb-3">Aftercare Steps</h4>
            {aftercareSteps.map((step) => (
              <div key={step.step} className="mb-3">
                <h5 className="text-secondary">
                  Step {step.step}: {step.title}
                </h5>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
    
          {/* Tips Section */}
          <div className="mt-4">
            <h4 className="text-uppercase text-success mb-3">Helpful Tips</h4>
            <ul>
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
    
          {/* Recommended Products Section */}
          <div className="mt-4">
            <h4 className="text-uppercase text-info mb-3">Recommended Products</h4>
            <div className="row">
              {recommendedProducts.map((product, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          {/* FAQs Section */}
          <div className="mt-4">
            <h4 className="text-uppercase text-warning mb-3">Frequently Asked Questions</h4>
            <div className="accordion" id="aftercareFAQ">
              <div className="accordion-item">
                <h2 className="accordion-header" id="questionOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#answerOne"
                    aria-expanded="true"
                    aria-controls="answerOne"
                  >
                    How long does it take for a tattoo to heal?
                  </button>
                </h2>
                <div
                  id="answerOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="questionOne"
                  data-bs-parent="#aftercareFAQ"
                >
                  <div className="accordion-body">
                    Most tattoos take about 2-3 weeks to heal on the surface. However, deeper healing can take up to 4-6 weeks.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="questionTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#answerTwo"
                    aria-expanded="false"
                    aria-controls="answerTwo"
                  >
                    What should I do if my tattoo gets infected?
                  </button>
                </h2>
                <div
                  id="answerTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="questionTwo"
                  data-bs-parent="#aftercareFAQ"
                >
                  <div className="accordion-body">
                    Contact your tattoo artist or a healthcare provider immediately. Common signs of infection include redness, swelling, and pus.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Aftercare;
