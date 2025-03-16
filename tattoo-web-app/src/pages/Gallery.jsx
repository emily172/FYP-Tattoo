import React, { useState } from "react";
import "../styles/Gallery.css"// Import custom styles

const designs = [
  { id: 1, name: "Wolf Portrait", image: "https://placehold.co/400x300", style: "Micro Realism" },
  { id: 2, name: "Floral Design", image: "https://placehold.co/300x400", style: "Micro Realism" },
  { id: 3, name: "Tribal Sun", image: "https://placehold.co/400x400", style: "Tribal" },
  { id: 4, name: "Geometric Pattern", image: "https://placehold.co/350x400", style: "Tribal" },
  { id: 5, name: "Color Splash", image: "https://placehold.co/300x300", style: "Abstract" },
  { id: 6, name: "Fractal Design", image: "https://placehold.co/300x300", style: "Abstract" },
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  // Open the lightbox/modal
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
  };

  // Navigate to the previous image
  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? designs.length - 1 : prevIndex - 1));
  };

  // Navigate to the next image
  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === designs.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Tattoo Gallery</h2>
      <div className="gallery-grid">
        {designs.map((design, index) => (
          <div key={design.id} className="gallery-item" onClick={() => openModal(index)}>
            <img src={design.image} alt={design.name} className="gallery-image" />
            <div className="gallery-item-hover">
              <h5>{design.name}</h5>
              <p>{design.style}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="lightbox">
          <button className="lightbox-close" onClick={closeModal}>
            &times;
          </button>
          <button className="lightbox-prev" onClick={showPreviousImage}>
            &#10094;
          </button>
          <img src={designs[currentImageIndex].image} alt={designs[currentImageIndex].name} className="lightbox-image" />
          <div className="lightbox-info">
            <h5>{designs[currentImageIndex].name}</h5>
            <p>{designs[currentImageIndex].style}</p>
          </div>
          <button className="lightbox-next" onClick={showNextImage}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
