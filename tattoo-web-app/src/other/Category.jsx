/*import React from "react";
import "../styles/Category.css"// Import custom styles

const categorizedDesigns = {
  "Micro Realism": [
    { id: 1, name: "Wolf Portrait", image: "https://placehold.co/250x150" },
    { id: 2, name: "Eye Detail", image: "https://placehold.co/250x150" },
    { id: 3, name: "Small Flower", image: "https://placehold.co/250x150" },
    { id: 4, name: "Miniature Landscape", image: "https://placehold.co/250x150" },
  ],
  Tribal: [
    { id: 5, name: "Tribal Sun", image: "https://placehold.co/250x150" },
    { id: 6, name: "Geometric Pattern", image: "https://placehold.co/250x150" },
    { id: 7, name: "Tribal Sleeve", image: "https://placehold.co/250x150" },
    { id: 8, name: "Celtic Cross", image: "https://placehold.co/250x150" },
  ],
  Abstract: [
    { id: 9, name: "Color Splash", image: "https://placehold.co/250x150" },
    { id: 10, name: "Abstract Shapes", image: "https://placehold.co/250x150" },
    { id: 11, name: "Line Art", image: "https://placehold.co/250x150" },
    { id: 12, name: "Fractal Design", image: "https://placehold.co/250x150" },
  ],
};

const Category = () => {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Tattoo Gallery</h2>
      {Object.entries(categorizedDesigns).map(([category, designs]) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="category-grid">
            {designs.map((design) => (
              <div key={design.id} className="gallery-item">
                <img
                  src={design.image}
                  alt={design.name}
                  className="gallery-image"
                />
                <p className="gallery-item-name">{design.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;*/