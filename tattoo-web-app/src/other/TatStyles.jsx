/*import React, { useState } from "react";
import { designs } from "../data/designs";

const TatStyles = () => {
  const [selectedStyle, setSelectedStyle] = useState(""); // Filter state

  const handleStyleChange = (e) => {
    setSelectedStyle(e.target.value);
  };

  const filteredDesigns = designs.filter(
    (design) => selectedStyle === "" || design.style === selectedStyle
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tattoo Styles</h2>*/

      {/* Dropdown for Filtering */}
     /* <div className="mb-4">
        <select
          className="form-select"
          value={selectedStyle}
          onChange={handleStyleChange}
        >
          <option value="">All Styles</option>
          <option value="Traditional">Traditional</option>
          <option value="Blackwork">Blackwork</option>
          <option value="Geometric">Geometric</option>
        </select>
      </div>
*/
      {/* Display Filtered Cards */}
      /*<div className="row">
        {filteredDesigns.length > 0 ? (
          filteredDesigns.map((design) => (
            <div className="col-md-4 mb-4" key={design.id}>
              <div className="card">
                <img
                  src={design.image || "https://via.placeholder.com/300"}
                  alt={design.name || "Tattoo Design"}
                  className="card-img-top"
                  style={{
                    objectFit: "cover", // Ensures image scales proportionally
                    height: "200px", // Fixed height for consistent appearance
                    width: "100%", // Fits card width
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{design.name}</h5>
                  <p>Style: {design.style}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No designs match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TatStyles;*/