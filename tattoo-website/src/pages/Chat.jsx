import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io('http://localhost:5000'); // Connect to your backend server

  useEffect(() => {
    // Listen for chat history on initial connection
    socket.on('chatHistory', (messages) => {
      setMessages(messages);
    });

    // Listen for new messages broadcasted by the server
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.disconnect(); // Cleanup socket connection on unmount
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return; // Prevent sending empty messages

    const message = {
      sender: 'Admin', // Replace with actual user (e.g., dynamically fetched username)
      content: input,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', message); // Emit message to the server
    setMessages((prevMessages) => [...prevMessages, message]); // Update local state
    setInput(''); // Clear input field
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">Chat Application</h2>
      <div className="h-80 overflow-y-scroll border border-gray-300 bg-white rounded-lg p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg shadow-sm ${
              msg.sender === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            <p className="font-medium">{msg.sender}</p>
            <p>{msg.content}</p>
            <span className="text-xs text-gray-500 block mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-blue-500 text-white font-medium rounded-r-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
