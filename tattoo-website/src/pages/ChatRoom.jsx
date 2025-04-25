import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the server

const ChatRoom = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
        const response = await axios.get(`http://localhost:5000/messages?chatWithId=${selectedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (selectedUser) fetchMessages();

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      if (message.senderId === selectedUser._id || message.receiverId === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser]);

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
      const senderId = JSON.parse(atob(token.split(".")[1])).id; // Decode JWT to get sender ID

      const newMessageObj = {
        senderId,
        receiverId: selectedUser._id,
        message: newMessage,
      };

      // Emit the message to the server
      socket.emit("sendMessage", newMessageObj);

      // Update the message list immediately
      setMessages((prev) => [...prev, { ...newMessageObj, _id: Date.now().toString() }]); // Generate a temporary unique key
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-room flex flex-col p-4 bg-white shadow-md rounded-lg">
      <div className="messages flex-grow overflow-y-auto border-b border-gray-300 pb-4">
        {messages.map((msg) => (
          <p
            key={msg._id} // Ensures every child element has a unique key
            className={`my-2 p-2 rounded-md ${
              msg.senderId === selectedUser._id ? "bg-gray-200 text-gray-700" : "bg-blue-500 text-white"
            }`}
          >
            {msg.message}
          </p>
        ))}
      </div>
      <div className="input-area flex mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
