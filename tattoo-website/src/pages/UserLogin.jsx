import React, { useState } from 'react';
import axios from 'axios';

function UserLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/login', formData);
            const token = response.data.token;
            localStorage.setItem('userToken', token); // Store the token in localStorage
            setSuccess('Login successful! Redirecting...');
            setError('');
            // Redirect to chat app after login
            setTimeout(() => (window.location.href = '/chat'), 1000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to log in');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">User Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserLogin;
