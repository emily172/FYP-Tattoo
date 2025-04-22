import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TattooStylePage = () => {
  const { id } = useParams(); // Capture the style ID from the URL
  const [style, setStyle] = useState(null);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel functionality

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tattoo-styles/${id}`) // Fetch the selected style details
      .then((response) => setStyle(response.data))
      .catch((err) => {
        console.error('Error fetching tattoo style:', err);
        setError(true);
      });
  }, [id]);

  if (error)
    return <p className="text-red-500 text-center">Error loading style details. Please try again later.</p>;
  if (!style) return <p className="text-center text-gray-400 animate-pulse">Loading style details...</p>;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? style.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === style.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-8">
      {/* Header Section */}
      <header className="text-center mb-16 relative">
        <div className="relative overflow-hidden rounded-3xl shadow-xl group">
          {/* Image with Hover Effect */}
          <img
            src={style.image}
            alt={style.name}
            className="w-full h-[50rem] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
          {/* Rotating Title with Icon */}
          <div className="absolute bottom-8 left-8 flex items-center space-x-4">
            <h1 className="text-6xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-white text-transparent bg-clip-text transition-transform duration-700 hover:rotate-[360deg]">
              {style.name}
            </h1>
            <span className="text-pink-500 text-4xl">🌟</span>
          </div>
        </div>
      </header>

      <section className="mb-16 max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center animate-pulse">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-gradient-flow flex items-center space-x-4">
          <span className="text-indigo-500">🎨</span>
          <span>About This Style</span>
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed transition-transform duration-500 hover:scale-105 animate-fade-in">
          {style.descriptor || "Discover the unique characteristics that make this tattoo style timeless and captivating."}
        </p>
        <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2 animate-grow"></div>
        <p className="mt-6 text-gray-400 text-lg leading-relaxed transition-transform duration-500 hover:scale-110 animate-slide-in">
          Tattoos have evolved from ancient symbols to modern expressions of individuality. This style incorporates bold lines, intricate shading, and innovative techniques that push creative boundaries, making each design unique and meaningful.
        </p>
        <p className="mt-6 text-gray-400 text-lg leading-relaxed transition-transform duration-500 hover:scale-110 animate-slide-in">
          Often inspired by cultural traditions and artistic movements, this tattoo style bridges the gap between heritage and contemporary trends. It allows artists and clients to collaborate in creating distinctive artwork that tells a personal story.
        </p>
      </section>


      {/* Gallery Section */}
      {style.images && style.images.length > 0 && (
        <section className="mb-16 px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
          <h2 className="text-4xl font-extrabold tracking-wide mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text text-center flex items-center justify-center space-x-4">
            <span>✨ Featured Tattoo Gallery ✨</span>
            <span className="text-pink-500 text-3xl">📷</span>
          </h2>

          {/* Carousel Wrapper */}
          <div className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <div className="overflow-hidden rounded-xl relative">
              {/* Image */}
              <img
                src={style.images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-[650px] object-cover transition-opacity duration-500 ease-in-out opacity-100"
              />
              {/* Caption */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md">
                {style.imageDescriptions
                  ? style.imageDescriptions[currentIndex]
                  : `Image ${currentIndex + 1}`}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full shadow-lg hover:scale-125 transition-all"
            >
              &#8249;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full shadow-lg hover:scale-125 transition-all"
            >
              &#8250;
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-4 mt-8">
            {style.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-5 h-5 rounded-full ${currentIndex === index ? "bg-pink-500 scale-125" : "bg-gray-500"
                  } transition-transform duration-300`}
              ></button>
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center space-x-2 mt-4">
            {style.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${currentIndex === index ? "ring-4 ring-pink-500" : ""
                  }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Remaining Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* History */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-pink-500">🌍</span>
            <span>History</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.history || "Explore the rich origins and evolution of tattooing across cultures."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Tattoos are among humanity's oldest art forms, with evidence dating back over 5,000 years. Ancient Egyptians adorned their bodies to signify status, faith, and beauty, while Polynesian tattooing reflected tribal affiliations and milestones.
          </p>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Over centuries, tattoos transcended cultural boundaries, finding their way to sailors who preserved designs that symbolized their adventurous spirits. Today, tattooing is celebrated globally, blending rich histories with personal expression and artistic mastery.
          </p>
        </section>

        {/* Cultural Signficance */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-red-500">🌏</span>
            <span>Cultural Significance</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.culturalSignificance || "Discover the profound cultural connections and meanings behind this tattoo style."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Tattoos hold unique significance in diverse cultures. In Polynesian traditions, intricate patterns represent family ties, spiritual beliefs, and rites of passage. Similarly, Japanese Irezumi tattoos convey themes of strength and protection, often depicting mythological creatures like dragons and phoenixes.
          </p>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Across the globe, tattoos have been used to mark identity, express individuality, and honor heritage. Modern interpretations of cultural styles blend traditional motifs with contemporary design, celebrating the artistry and meaning behind each tattoo.
          </p>
        </section>


        {/* Maintenance Timeline */}
        <section className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-indigo-500">📅</span>
            <span>Maintenance Timeline</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.maintenanceTimeline || "Learn the steps to preserve and maintain your tattoo's quality."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Proper tattoo care is crucial. Keep your tattoo moisturized, avoid direct sunlight, and follow the recommended healing steps to prevent fading or damage.
          </p>
        </section>



        {/* Style-Specific Challenges */}
        <section className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-red-500">⚠️</span>
            <span>Style-Specific Challenges</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.challenges || "Understand the unique challenges of this tattoo style."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Fine-line styles often require a steady hand and precise technique, while vibrant colors need special care to prevent fading. Discuss with your tattoo artist for personalized guidance.
          </p>
        </section>


        {/* Fun Facts */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-pink-500">✨</span>
            <span>Fun Facts</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.funFacts || "Tattoos can be found in every culture, ranging from symbolic tribal tattoos to modern minimalist designs. Did you know? The world’s oldest tattooed human is Ötzi the Iceman, who lived over 5,000 years ago!"}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Tattoo history is filled with fascinating traditions, such as Polynesian tattoo patterns representing status and ancestry, and sailors' tattoos symbolizing their travels.
          </p>
        </section>

        {/* Tools and Techniques */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-purple-500">🛠️</span>
            <span>Tools and Techniques</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.toolsTechniques || "The evolution of tattooing tools has drastically changed the art form. From bamboo sticks used in traditional Japanese tebori techniques to advanced rotary and coil machines enabling intricate designs."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Tattoo artists today employ various techniques, including hand-poking for vintage aesthetics and bold shading for complex designs. Each method requires precision and creativity.
          </p>
        </section>

        {/* Iconic Designs */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-yellow-500">🌟</span>
            <span>Iconic Designs</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.iconicDesigns || "From traditional American-style tattoos with bold outlines to intricate mandala designs, iconic tattoos captivate with their timeless appeal."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Iconic motifs like roses, skulls, and dragons have evolved through the years to remain universally popular, often signifying strength, beauty, or transformation.
          </p>
        </section>

        {/* Studio Environment */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-green-500">🏢</span>
            <span>Studio Environment</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.studioEnvironment || "Modern tattoo studios are a blend of art spaces and medical-grade setups, prioritizing both creativity and hygiene."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Studios ensure sterilized tools, disposable ink cups, and a welcoming ambiance that fosters comfort for both the artist and client. Always ensure your chosen studio meets health standards.
          </p>
        </section>

        {/* Estimated Duration */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-orange-500">⏱️</span>
            <span>Estimated Duration</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.estimatedDuration || "Learn the expected timeframes for different styles and complexities."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Simple line tattoos may take 20 minutes, while detailed full-sleeve tattoos require multiple sessions spanning hours. Discuss time estimates with your tattoo artist to plan accordingly.
          </p>
        </section>

        {/* Common Locations */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-blue-500">📍</span>
            <span>Common Locations</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.commonLocations || "Explore popular placements that enhance tattoo visibility and aesthetics."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Areas like forearms, wrists, and backs allow creative designs to stand out. Smaller tattoos work well on fingers or ankles for a more discreet yet elegant statement.
          </p>
        </section>


        {/* Prepare */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-purple-500">📝</span>
            <span>Prepare</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.prepare || "Learn how to get ready for your tattoo session and ensure a smooth experience."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Preparation is key to having a great tattoo experience. Stay hydrated, eat a balanced meal before your appointment, and avoid alcohol or blood-thinning medications. Wear comfortable clothing that allows easy access to the tattoo area.
          </p>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Bringing reference images and discussing your ideas with the artist can ensure your vision comes to life. Be punctual and mentally prepared for the session, as tattoos can require patience and tolerance for minor discomfort.
          </p>
        </section>


        {/* Aftercare */}
        <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center space-x-4">
            <span className="text-green-500">💧</span>
            <span>Aftercare</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {style.aftercare || "Understand how to properly care for your tattoo to ensure optimal healing and longevity."}
          </p>
          <div className="mt-6 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto w-1/2"></div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Aftercare is vital for preventing infections and maintaining the quality of your tattoo. Follow the artist's instructions: gently clean the area with lukewarm water and mild soap, then pat it dry. Apply a thin layer of recommended ointment and avoid touching the tattoo unnecessarily.
          </p>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            During the healing process, protect your tattoo from direct sunlight, soaking in water, and wearing tight or abrasive clothing over the area. Avoid scratching or picking at scabs to prevent damage. A properly healed tattoo is vibrant, long-lasting, and a true work of art.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TattooStylePage;
