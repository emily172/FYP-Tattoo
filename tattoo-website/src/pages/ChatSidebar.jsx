import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for toggle button

const ChatSidebar = ({ onSelectUser }) => {
  const [contacts, setContacts] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle state for sidebar

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
      } catch (err) {
        setError("Failed to fetch contacts. Please try again.");
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

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
          <ul className="divide-y divide-gray-200 overflow-y-auto h-[calc(100%-4rem)]">
            {contacts.map((contact) => (
              <li
                key={contact._id}
                onClick={() => onSelectUser(contact)}
                className="p-4 hover:bg-blue-100 cursor-pointer"
              >
                <p className="text-gray-800 font-medium">{contact.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
