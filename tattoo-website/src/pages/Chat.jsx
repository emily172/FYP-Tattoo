import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar"; // Sidebar component
import ChatRoom from "./ChatRoom"; // Chat room component

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
  const [selectedUser, setSelectedUser] = useState(null); // Selected contact

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-64 bg-gray-100 shadow-lg transition-all duration-300">
          <ChatSidebar
            onSelectUser={setSelectedUser}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-grow flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "pl-0 lg:pl-64" : ""
        }`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 shadow">
          <h1 className="text-lg font-bold">Chat Application</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-gray-800 text-white px-3 py-2 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {isSidebarOpen ? "Hide Contacts" : "Show Contacts"}
          </button>
        </div>

        {/* Chat Room */}
        <div className="flex-grow">
          {selectedUser ? (
            <ChatRoom selectedUser={selectedUser} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a contact to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;







/*import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]); // State for chat messages
  const [input, setInput] = useState(''); // State for the current input
  const [isTyping, setIsTyping] = useState(false); // State for typing indicator
  const socket = io('http://localhost:5000'); // Connect to the Socket.IO server

  useEffect(() => {
    // Fetch chat history on initial connection
    socket.on('chatHistory', (messages) => {
      setMessages(messages);
    });

    // Listen for new messages from the server
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for typing notifications
    socket.on('userTyping', (typing) => {
      setIsTyping(typing);
    });

    return () => socket.disconnect(); // Cleanup socket connection on component unmount
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    socket.emit('typing', e.target.value.length > 0); // Notify server about typing status
  };

  const sendMessage = () => {
    if (input.trim() === '') return; // Prevent sending empty messages

    const message = {
      sender: 'Admin', // Replace with actual user name or ID
      content: input,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', message); // Send the message to the server
    setMessages((prevMessages) => [...prevMessages, message]); // Add the message locally
    setInput(''); // Clear the input field
    socket.emit('typing', false); // Notify server that typing has stopped
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">Chat Application</h2>
      */
      {/* Chat Messages Area */}
      /*<div className="h-80 overflow-y-scroll border border-gray-300 bg-white rounded-lg p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`grid grid-cols-[auto,1fr] gap-4 items-center mb-4 p-3 rounded-lg shadow-sm ${
              msg.sender === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >*/
            {/* Avatar */}
           /* <img
              src={msg.sender === 'Admin' ? './img1.jpg' : '/user-avatar.png'}
              alt={`${msg.sender} avatar`}
              className="w-10 h-10 rounded-full"
            />*/
            {/* Message Content */}
            /*<div>
              <p className="font-medium">{msg.sender}</p>
              <p>{msg.content}</p>
              <span className="text-xs text-gray-500 block mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}*/
        {/* Typing Indicator */}
      /*{isTyping && (
          <div className="text-sm text-gray-500 italic">Someone is typing...</div>
        )}
      </div>
*/
      {/* Input and Button Section */}
    /*  <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;*/
