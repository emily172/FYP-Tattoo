import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TattooStylePage = () => {
    const { id } = useParams(); // Capture the style ID from the URL
    const [style, setStyle] = useState(null);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/tattoo-styles/${id}`) // Fetch the selected style details
        .then((response) => setStyle(response.data))
        .catch((err) => {
          console.error('Error fetching tattoo style:', err);
          setError(true);
        });
    }, [id]);
  
    if (error) return <p>Error loading style details. Please try again later.</p>;
    if (!style) return <p>Loading style details...</p>;
  
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">{style.name}</h1>
        <img src={style.image} alt={style.name} className="w-full h-60 object-cover rounded-md mb-4" />
        <p className="text-gray-700 mb-6">{style.description}</p>
        <p className="text-gray-700">{style.descriptor}</p>
      </div>
    );
  };
  

export default TattooStylePage;
