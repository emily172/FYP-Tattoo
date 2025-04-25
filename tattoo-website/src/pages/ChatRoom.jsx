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

      // Optionally: Update the message list immediately
      setMessages((prev) => [...prev, newMessageObj]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg) => (
          <p key={msg._id} className={msg.senderId === selectedUser._id ? "received" : "sent"}>
            {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
