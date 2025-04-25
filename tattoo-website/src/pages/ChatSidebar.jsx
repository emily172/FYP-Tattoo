import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatSidebar = ({ onSelectUser }) => {
  const [contacts, setContacts] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT to extract the role
        setRole(decodedToken.role);

        let response;
        if (decodedToken.role === "admin") {
          // Fetch both users and admins for admin role
          response = await axios.get("http://localhost:5000/api/contacts", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (decodedToken.role === "user") {
          // Fetch only admins for user role
          response = await axios.get("http://localhost:5000/api/admins", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        setContacts(response.data.contacts); // Update contacts state
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="chat-sidebar bg-gray-100 w-64 h-full shadow-lg">
      <h2 className="text-lg font-bold text-gray-700 p-4 border-b">
        {role === "admin" ? "All Contacts" : "Admins"}
      </h2>
      <ul className="divide-y divide-gray-200">
        {contacts.map((contact) => (
          <li
            key={contact._id}
            onClick={() => onSelectUser(contact)}
            className="p-4 hover:bg-gray-200 cursor-pointer"
          >
            {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
