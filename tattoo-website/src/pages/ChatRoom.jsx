import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatRoom = ({ selectedUser, onStartVideoCall }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for file uploads
  const [filePreview, setFilePreview] = useState(null); // State for image preview
  const [searchTerm, setSearchTerm] = useState(""); // For filtering messages
  const messagesEndRef = useRef(null); // To scroll to the latest message

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

    // Real-time incoming message listener
    socket.on("receiveMessage", (message) => {
      if (message.senderId === selectedUser._id || message.receiverId === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser]);

  // Automatically scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Filter messages based on the search term
  const filteredMessages = messages.filter((msg) =>
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file selection and create preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith("image/")) {
      const previewURL = URL.createObjectURL(file); // Create a preview URL
      setFilePreview(previewURL);
    }
  };

  // Handle sending a new message or file
  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;

    try {
      const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
      const formData = new FormData();

      formData.append("receiverId", selectedUser._id);
      formData.append("message", newMessage);
      if (selectedFile) {
        formData.append("file", selectedFile); // Add file to the request
      }

      // Send the message and file to the backend
      const response = await axios.post("http://localhost:5000/messages", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const savedMessage = response.data;

      // Emit the new message in real-time
      socket.emit("sendMessage", savedMessage);

      // Update message list
      setMessages((prev) => [...prev, savedMessage]);

      // Clear inputs
      setNewMessage("");
      setSelectedFile(null);
      setFilePreview(null); // Clear file preview
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Handle pressing "Enter" to send a message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat with {selectedUser.email}</h2>
        <div className="flex items-center space-x-2">
          {/* Search Messages */}
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Video Call Button */}
          <button
            onClick={() => onStartVideoCall(selectedUser)}
            className="bg-blue-500 text-white px-3 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none"
          >
            Video Call
          </button>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === selectedUser._id ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md ${
                msg.senderId === selectedUser._id ? "bg-gray-200 text-gray-700" : "bg-blue-500 text-white"
              }`}
            >
              {/* Display text message */}
              {msg.message && <p>{msg.message}</p>}

              {/* Display uploaded files */}
              {msg.filePath && (
                <div className="mt-2">
                  {msg.fileType.startsWith("image/") && (
                    <img
                      src={`http://localhost:5000${msg.filePath}`}
                      alt={msg.fileName}
                      className="w-32 h-32 object-cover rounded-md cursor-pointer"
                      onClick={() => window.open(`http://localhost:5000${msg.filePath}`, "_blank")} // Open in new tab
                    />
                  )}
                </div>
              )}
              <span className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white rounded-b-lg flex items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mr-2 border rounded-md px-2 py-1"
        />
        {filePreview && (
          <div className="w-32 h-32 mx-2">
            <img
              src={filePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger send on "Enter"
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
