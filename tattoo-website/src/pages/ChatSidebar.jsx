import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaThumbtack } from "react-icons/fa"; // Icons for toggle and pin

const ChatSidebar = ({ onSelectUser }) => {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]); // List of pinned favorites
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle state for sidebar
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering contacts

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setRole(decodedToken.role);

        let response;
        if (decodedToken.role === "admin") {
          response = await axios.get("http://localhost:5000/api/contacts", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (decodedToken.role === "user") {
          response = await axios.get("http://localhost:5000/api/admins", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        setContacts(response.data.contacts);

        // Load pinned contacts from local storage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
      } catch (err) {
        setError("Failed to fetch contacts. Please try again.");
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) =>
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pin/unpin functionality
  const handlePin = (contact) => {
    const updatedFavorites = favorites.some((fav) => fav._id === contact._id)
      ? favorites.filter((fav) => fav._id !== contact._id) // Remove from favorites
      : [...favorites, contact]; // Add to favorites

    setFavorites(updatedFavorites);

    // Save updated favorites to local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Remove pinned contacts from the main list
  const nonFavoriteContacts = filteredContacts.filter(
    (contact) => !favorites.some((fav) => fav._id === contact._id)
  );

  return (
    <div className="relative">
      {/* Header Section with Toggle Button */}
      <div className="flex items-center justify-between bg-gray-100 border-b p-4">
        <h2 className="text-lg font-bold text-gray-700">
          {role === "admin" ? "All Contacts" : "Admins"}
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg flex items-center transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isSidebarOpen ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
          {isSidebarOpen ? "Hide" : "Show"} Contacts
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        className={`bg-gray-100 w-full lg:w-64 h-full shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {loading ? (
          <p className="text-gray-500 p-4">Loading contacts...</p>
        ) : error ? (
          <p className="text-red-500 p-4">{error}</p>
        ) : (
          <>
            {/* Search Bar */}
            <div className="p-4">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Favorites Section */}
            {favorites.length > 0 && (
              <div className="bg-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-600">Pinned Contacts</h3>
                <ul className="divide-y divide-gray-300">
                  {favorites.map((favorite) => (
                    <li
                      key={favorite._id}
                      onClick={() => onSelectUser(favorite)}
                      className="p-4 flex justify-between hover:bg-blue-100 cursor-pointer"
                    >
                      <p className="text-gray-800 font-medium">{favorite.email}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePin(favorite);
                        }}
                        className="text-gray-500 hover:text-gray-800"
                      >
                        <FaThumbtack />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Filtered Contacts Section */}
            <ul className="divide-y divide-gray-200 overflow-y-auto h-[calc(100%-8rem)]">
              {nonFavoriteContacts.map((contact) => (
                <li
                  key={contact._id}
                  onClick={() => onSelectUser(contact)}
                  className="p-4 flex justify-between hover:bg-blue-100 cursor-pointer"
                >
                  <p className="text-gray-800 font-medium">{contact.email}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePin(contact);
                    }}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <FaThumbtack />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
