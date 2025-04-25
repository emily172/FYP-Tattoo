import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTattooStyles = () => {
  const [styles, setStyles] = useState([]);
  const [newStyle, setNewStyle] = useState({
    name: '',
    description: '',
    image: '',
    descriptor: '',
    images: [],
    commonLocations: '',
    preparation: '',
    aftercare: '',
    funFacts: '',
    history: '',
    challenges: '',
    toolsTechniques: '',
    maintenanceTimeline: '',
    iconicDesigns: '',
    studioEnvironment: '',
    estimatedDuration: '',
  });
  const [selectedStyle, setSelectedStyle] = useState(null); // For edit mode
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoo-styles') // Fetch all tattoo styles
      .then((response) => setStyles(response.data))
      .catch(() => setError('Failed to fetch tattoo styles.'));
  }, []);

  const handleAddStyle = (e) => {
    e.preventDefault();
    if (!newStyle.name || !newStyle.description || !newStyle.image) {
      setError('Name, Description, and Image are required.');
      return;
    }

    axios
      .post('http://localhost:5000/tattoo-styles', newStyle)
      .then((response) => {
        setStyles([response.data, ...styles]); // Add to the list
        resetForm();
        setError('');
      })
      .catch(() => setError('Failed to add tattoo style.'));
  };

  const handleEditStyle = (e) => {
    e.preventDefault();
    if (!selectedStyle.name || !selectedStyle.description || !selectedStyle.image) {
      setError('Name, Description, and Image are required.');
      return;
    }

    axios
      .put(`http://localhost:5000/tattoo-styles/${selectedStyle._id}`, selectedStyle)
      .then((response) => {
        setStyles(styles.map((style) => (style._id === response.data._id ? response.data : style))); // Update the list
        resetForm();
        setError('');
      })
      .catch(() => setError('Failed to update tattoo style.'));
  };

  const deleteStyle = (id) => {
    if (window.confirm('Are you sure you want to delete this style?')) {
      axios
        .delete(`http://localhost:5000/tattoo-styles/${id}`)
        .then(() => setStyles(styles.filter((style) => style._id !== id))) // Remove from list
        .catch(() => setError('Failed to delete tattoo style.'));
    }
  };

  const resetForm = () => {
    setNewStyle({
      name: '',
      description: '',
      image: '',
      descriptor: '',
      images: [],
      commonLocations: '',
      preparation: '',
      aftercare: '',
      funFacts: '',
      history: '',
      challenges: '',
      toolsTechniques: '',
      maintenanceTimeline: '',
      iconicDesigns: '',
      studioEnvironment: '',
      estimatedDuration: '',
    });
    setSelectedStyle(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg">Tattoo Style Management</h1>
        <p className="text-lg text-gray-700 mt-2">Create, update, and explore tattoo styles effortlessly.</p>
      </header>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Add/Edit Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {selectedStyle ? 'Edit Tattoo Style' : 'Add New Tattoo Style'}
        </h2>
        <form onSubmit={selectedStyle ? handleEditStyle : handleAddStyle} className="space-y-4">
          <input
            type="text"
            placeholder="Style Name"
            value={selectedStyle ? selectedStyle.name : newStyle.name}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, name: e.target.value })
                : setNewStyle({ ...newStyle, name: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            placeholder="Description"
            value={selectedStyle ? selectedStyle.description : newStyle.description}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, description: e.target.value })
                : setNewStyle({ ...newStyle, description: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            placeholder="Detailed Descriptor"
            value={selectedStyle ? selectedStyle.descriptor : newStyle.descriptor}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, descriptor: e.target.value })
                : setNewStyle({ ...newStyle, descriptor: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="url"
            placeholder="Primary Image URL"
            value={selectedStyle ? selectedStyle.image : newStyle.image}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, image: e.target.value })
                : setNewStyle({ ...newStyle, image: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            placeholder="Additional Image URLs (one per line)"
            value={selectedStyle ? selectedStyle.images.join('\n') : newStyle.images.join('\n')}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, images: e.target.value.split('\n') })
                : setNewStyle({ ...newStyle, images: e.target.value.split('\n') })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Common Tattoo Locations"
            value={selectedStyle ? selectedStyle.commonLocations : newStyle.commonLocations}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, commonLocations: e.target.value })
                : setNewStyle({ ...newStyle, commonLocations: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Preparation Tips"
            value={selectedStyle ? selectedStyle.preparation : newStyle.preparation}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, preparation: e.target.value })
                : setNewStyle({ ...newStyle, preparation: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Aftercare Instructions"
            value={selectedStyle ? selectedStyle.aftercare : newStyle.aftercare}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, aftercare: e.target.value })
                : setNewStyle({ ...newStyle, aftercare: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Fun Facts"
            value={selectedStyle ? selectedStyle.funFacts : newStyle.funFacts}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, funFacts: e.target.value })
                : setNewStyle({ ...newStyle, funFacts: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="History"
            value={selectedStyle ? selectedStyle.history : newStyle.history}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, history: e.target.value })
                : setNewStyle({ ...newStyle, history: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Challenges"
            value={selectedStyle ? selectedStyle.challenges : newStyle.challenges}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, challenges: e.target.value })
                : setNewStyle({ ...newStyle, challenges: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Tools and Techniques"
            value={selectedStyle ? selectedStyle.toolsTechniques : newStyle.toolsTechniques}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, toolsTechniques: e.target.value })
                : setNewStyle({ ...newStyle, toolsTechniques: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Maintenance Timeline"
            value={selectedStyle ? selectedStyle.maintenanceTimeline : newStyle.maintenanceTimeline}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, maintenanceTimeline: e.target.value })
                : setNewStyle({ ...newStyle, maintenanceTimeline: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Iconic Designs"
            value={selectedStyle ? selectedStyle.iconicDesigns : newStyle.iconicDesigns}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, iconicDesigns: e.target.value })
                : setNewStyle({ ...newStyle, iconicDesigns: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Tattoo Studio Environment"
            value={selectedStyle ? selectedStyle.studioEnvironment : newStyle.studioEnvironment}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, studioEnvironment: e.target.value })
                : setNewStyle({ ...newStyle, studioEnvironment: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Estimated Duration (e.g., 2-6 hours)"
            value={selectedStyle ? selectedStyle.estimatedDuration : newStyle.estimatedDuration}
            onChange={(e) =>
              selectedStyle
                ? setSelectedStyle({ ...selectedStyle, estimatedDuration: e.target.value })
                : setNewStyle({ ...newStyle, estimatedDuration: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className={`bg-${selectedStyle ? 'blue' : 'green'}-500 text-white px-4 py-2 rounded hover:bg-${selectedStyle ? 'blue' : 'green'}-600`}
          >
            {selectedStyle ? 'Update Style' : 'Add Style'}
          </button>
        </form>
      </div>

      {/* Styles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div key={style._id} className="bg-gray-100 shadow-lg rounded-lg p-4 hover:shadow-2xl">
            <h3 className="text-lg font-bold">{style.name}</h3>
            <p className="text-gray-600">{style.description.substring(0, 50)}...</p>
            <img
              src={style.image}
              alt={style.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedStyle(style)}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStyle(style._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTattooStyles;
