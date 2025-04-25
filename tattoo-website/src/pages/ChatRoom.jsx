import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatRoom = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // For message search

  // Fetch messages for the selected user
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
        const response = await axios.get(
          `http://localhost:5000/messages?chatWithId=${selectedUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (selectedUser) fetchMessages();

    // Listen for incoming messages and reaction updates via socket
    socket.on("receiveMessage", (message) => {
      if (message.senderId === selectedUser._id || message.receiverId === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("updateReactions", ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, reactions } : msg))
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateReactions");
    };
  }, [selectedUser]);

  // Filter messages based on the search term
  const filteredMessages = messages.filter((msg) =>
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending messages
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return; // Prevent empty messages

    try {
      const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
      const senderId = JSON.parse(atob(token.split(".")[1])).id;

      const newMessageObj = {
        senderId,
        receiverId: selectedUser._id,
        message: newMessage,
      };

      socket.emit("sendMessage", newMessageObj); // Emit message to server

      setMessages((prev) => [
        ...prev,
        { ...newMessageObj, _id: Date.now().toString(), timestamp: new Date(), reactions: [] },
      ]);
      setNewMessage(""); // Clear input field
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Handle pressing the Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(); // Send the message when Enter is pressed
    }
  };

  // Handle adding a reaction to a message
  const handleReaction = async (messageId) => {
    const emoji = prompt("Choose a reaction (e.g., 👍, 😂, ❤️):"); // Prompt user to pick an emoji
    if (!emoji) return;

    const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    try {
      const response = await axios.post(
        `http://localhost:5000/messages/${messageId}/react`,
        { emoji, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      socket.emit("addReaction", { messageId, emoji, userId }); // Emit reaction to server
    } catch (err) {
      console.error("Error adding reaction:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat with {selectedUser.email}</h2>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Messages Section */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.senderId === selectedUser._id ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg shadow-md ${
                msg.senderId === selectedUser._id ? "bg-gray-200 text-gray-700" : "bg-blue-500 text-white"
              }`}
            >
              <p>{msg.message}</p>
              <div className="flex items-center space-x-2 mt-2">
                {/* Display reactions */}
                {msg.reactions?.map((reaction, index) => (
                  <span key={index} className="text-lg">{reaction.emoji}</span>
                ))}
                <button
                  onClick={() => handleReaction(msg._id)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  React
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white rounded-b-lg flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key press
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
