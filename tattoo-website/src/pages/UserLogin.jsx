import React, { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/user/login", formData); // Backend API
      const { token } = response.data;

      // Save token in localStorage
      localStorage.setItem("userToken", token);

      setSuccessMessage("Login successful! Redirecting...");
      setFormData({ email: "", password: "" }); // Clear form

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/chat"; // Adjust the redirect as needed
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Failed to log in.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-lg rounded-lg px-8 pt-8 pb-8 max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-md mb-6">
         User Login
        </h2>
        {successMessage && (
          <p className="text-green-500 font-semibold text-center mb-4">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 font-semibold text-center mb-4">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-indigo-700 hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
