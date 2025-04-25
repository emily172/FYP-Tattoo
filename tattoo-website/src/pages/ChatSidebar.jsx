import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbtack } from "react-icons/fa"; // Icon for pin functionality

const ChatSidebar = ({ onSelectUser, onStartVideoCall }) => {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]); // List of pinned favorites
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    <div className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 shadow-md h-full rounded-xl">
      {/* Header Section */}
      <div className="bg-blue-600 text-white p-4 rounded-t-xl">
        <h2 className="text-lg font-bold">
          {role === "admin" ? "All Contacts" : "Admins"}
        </h2>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-full mt-2 p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="bg-blue-100 p-4">
          <h3 className="text-sm font-bold text-blue-700">Pinned Contacts</h3>
          <ul className="divide-y divide-blue-300">
            {favorites.map((favorite) => (
              <li
                key={favorite._id}
                onClick={() => onSelectUser(favorite)}
                className="p-4 flex justify-between hover:bg-blue-200 cursor-pointer rounded-lg transition"
              >
                <p className="text-blue-900 font-medium">{favorite.email}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePin(favorite);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaThumbtack />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filtered Contacts Section */}
      <ul className="divide-y divide-blue-200 overflow-y-auto h-[calc(100%-8rem)] px-4 pb-4">
        {nonFavoriteContacts.map((contact) => (
          <li
            key={contact._id}
            onClick={() => onSelectUser(contact)}
            className="p-4 flex justify-between hover:bg-blue-200 cursor-pointer rounded-lg transition"
          >
            <p className="text-blue-900 font-medium">{contact.email}</p>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-700 transition"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onSelectUser
                  onStartVideoCall(contact); // Trigger video call handler
                }}
              >
                Video Call
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePin(contact);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaThumbtack />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 font-semibold py-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default ChatSidebar;

