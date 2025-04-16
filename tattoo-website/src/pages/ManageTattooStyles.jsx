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
      .catch((err) => console.error('Error fetching tattoo styles:', err));
  }, []);

  const handleAddStyle = (e) => {
    e.preventDefault();

    // Validate input
    if (!newStyle.name || !newStyle.description || !newStyle.image) {
      setError('All fields are required.');
      return;
    }

    axios
      .post('http://localhost:5000/tattoo-styles', newStyle)
      .then((response) => {
        setStyles([response.data, ...styles]); // Add to the list
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
        }); // Reset form
        setError('');
      })
      .catch((err) => {
        console.error('Error adding style:', err);
        setError('Failed to add tattoo style.');
      });
  };

  const handleEditStyle = (e) => {
    e.preventDefault();

    // Validate input
    if (!selectedStyle.name || !selectedStyle.description || !selectedStyle.image) {
      setError('All fields are required.');
      return;
    }

    axios
      .put(`http://localhost:5000/tattoo-styles/${selectedStyle._id}`, selectedStyle) // Update existing style
      .then((response) => {
        setStyles(styles.map((style) => (style._id === response.data._id ? response.data : style))); // Update the list
        setSelectedStyle(null); // Exit edit mode
        setError('');
      })
      .catch((err) => {
        console.error('Error updating style:', err);
        setError('Failed to update tattoo style.');
      });
  };

  const deleteStyle = async (id) => {
    if (window.confirm('Are you sure you want to delete this style?')) {
      try {
        await axios.delete(`http://localhost:5000/tattoo-styles/${id}`); // Delete style
        setStyles(styles.filter((style) => style._id !== id)); // Remove from list
      } catch (err) {
        console.error('Error deleting style:', err);
        setError('Failed to delete tattoo style.');
      }
    }
  };

  const handleStyleClick = (style) => {
    setSelectedStyle(style); // Enable edit mode
  };

  const closeModal = () => {
    setSelectedStyle(null); // Exit edit mode
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Tattoo Styles</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add/Edit Form */}
      <form
        onSubmit={(e) => (selectedStyle ? handleEditStyle(e) : handleAddStyle(e))}
        className="mb-8 border p-4 rounded bg-white shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">{selectedStyle ? 'Edit Style' : 'Add New Style'}</h2>
        <input
          type="text"
          name="name"
          value={selectedStyle ? selectedStyle.name : newStyle.name}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, name: e.target.value })
              : setNewStyle({ ...newStyle, name: e.target.value })
          }
          placeholder="Style Name"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="description"
          value={selectedStyle ? selectedStyle.description : newStyle.description}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, description: e.target.value })
              : setNewStyle({ ...newStyle, description: e.target.value })
          }
          placeholder="Short Description"
          className="w-full p-2 border rounded mb-4"
          rows="3"
          required
        />
        <textarea
          name="descriptor"
          value={selectedStyle ? selectedStyle.descriptor : newStyle.descriptor}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, descriptor: e.target.value })
              : setNewStyle({ ...newStyle, descriptor: e.target.value })
          }
          placeholder="Detailed Descriptor"
          className="w-full p-2 border rounded mb-4"
          rows="5"
        />
        <input
          type="url"
          name="image"
          value={selectedStyle ? selectedStyle.image : newStyle.image}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, image: e.target.value })
              : setNewStyle({ ...newStyle, image: e.target.value })
          }
          placeholder="Primary Image URL"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="images"
          value={selectedStyle ? selectedStyle.images.join('\n') : newStyle.images.join('\n')}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, images: e.target.value.split('\n') })
              : setNewStyle({ ...newStyle, images: e.target.value.split('\n') })
          }
          placeholder="Additional Image URLs (one per line)"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="commonLocations"
          value={selectedStyle ? selectedStyle.commonLocations : newStyle.commonLocations}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, commonLocations: e.target.value })
              : setNewStyle({ ...newStyle, commonLocations: e.target.value })
          }
          placeholder="Common Locations (e.g., arms, back)"
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          name="preparation"
          value={selectedStyle ? selectedStyle.preparation : newStyle.preparation}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, preparation: e.target.value })
              : setNewStyle({ ...newStyle, preparation: e.target.value })
          }
          placeholder="Preparation Tips"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="aftercare"
          value={selectedStyle ? selectedStyle.aftercare : newStyle.aftercare}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, aftercare: e.target.value })
              : setNewStyle({ ...newStyle, aftercare: e.target.value })
          }
          placeholder="Aftercare Instructions"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="funFacts"
          value={selectedStyle ? selectedStyle.funFacts : newStyle.funFacts}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, funFacts: e.target.value })
              : setNewStyle({ ...newStyle, funFacts: e.target.value })
          }
          placeholder="Fun Facts"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="history"
          value={selectedStyle ? selectedStyle.history : newStyle.history}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, history: e.target.value })
              : setNewStyle({ ...newStyle, history: e.target.value })
          }
          placeholder="History"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="challenges"
          value={selectedStyle ? selectedStyle.challenges : newStyle.challenges}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, challenges: e.target.value })
              : setNewStyle({ ...newStyle, challenges: e.target.value })
          }
          placeholder="Style-Specific Challenges"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="toolsTechniques"
          value={selectedStyle ? selectedStyle.toolsTechniques : newStyle.toolsTechniques}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, toolsTechniques: e.target.value })
              : setNewStyle({ ...newStyle, toolsTechniques: e.target.value })
          }
          placeholder="Tools and Techniques"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="maintenanceTimeline"
          value={selectedStyle ? selectedStyle.maintenanceTimeline : newStyle.maintenanceTimeline}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, maintenanceTimeline: e.target.value })
              : setNewStyle({ ...newStyle, maintenanceTimeline: e.target.value })
          }
          placeholder="Tattoo Maintenance Timeline"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="iconicDesigns"
          value={selectedStyle ? selectedStyle.iconicDesigns : newStyle.iconicDesigns}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, iconicDesigns: e.target.value })
              : setNewStyle({ ...newStyle, iconicDesigns: e.target.value })
          }
          placeholder="Iconic Designs"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <textarea
          name="studioEnvironment"
          value={selectedStyle ? selectedStyle.studioEnvironment : newStyle.studioEnvironment}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, studioEnvironment: e.target.value })
              : setNewStyle({ ...newStyle, studioEnvironment: e.target.value })
          }
          placeholder="Tattoo Studio Environment"
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <input
          type="text"
          name="estimatedDuration"
          value={selectedStyle ? selectedStyle.estimatedDuration : newStyle.estimatedDuration}
          onChange={(e) =>
            selectedStyle
              ? setSelectedStyle({ ...selectedStyle, estimatedDuration: e.target.value })
              : setNewStyle({ ...newStyle, estimatedDuration: e.target.value })
          }
          placeholder="Estimated Duration (e.g., 2-6 hours)"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className={`bg-${selectedStyle ? 'blue' : 'green'}-500 text-white px-4 py-2 rounded hover:bg-${selectedStyle ? 'blue' : 'green'}-600`}
        >
          {selectedStyle ? 'Update Style' : 'Add Style'}
        </button>
      </form>

      {/* Styles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div key={style._id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{style.name}</h3>
            <p className="text-gray-500">{style.description.substring(0, 50)}...</p>
            <img
              src={style.image}
              alt={style.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedStyle(style)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
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
