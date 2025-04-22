import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Artists */}
        <NavLink
          to="/dashboard/artist"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage Team</h2>
          <p>View and edit the Team profiles.</p>
        </NavLink>

        {/* Manage Gallery */}
        <NavLink
          to="/dashboard/gallery"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage Gallery</h2>
          <p>Organize and update the tattoo gallery.</p>
        </NavLink>

        {/* Manage Studio */}
        <NavLink
          to="/dashboard/studio"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage Studio</h2>
          <p>Edit studio information and settings.</p>
        </NavLink>

        {/* Manage Blogs */}
        <NavLink
          to="/dashboard/blogs"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage Blogs</h2>
          <p>Manage blog posts and add new content.</p>
        </NavLink>

        {/* Manage Tattoo Styles */}
        <NavLink
          to="/dashboard/styles"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage Tattoo Styles</h2>
          <p>Add, edit, or delete tattoo styles.</p>
        </NavLink>

        {/* Manage Profiles */}
        <NavLink
          to="/dashboard/profiles"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage Profiles</h2>
          <p>Add, edit, or delete profiles.</p>
        </NavLink>

        {/* Manage FAQs */}
        <NavLink
          to="/dashboard/faqs"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage FAQs</h2>
          <p>View, create, edit, or delete FAQs.</p>
        </NavLink>

        {/* Manage History */}
        <NavLink
          to="/dashboard/history"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">Manage History</h2>
          <p>View, create, edit, or delete History.</p>
        </NavLink>

        
        {/* Manage Messages */}
        <NavLink
          to="/dashboard/admin-messages"
          className="bg-gray-800 text-white p-4 rounded shadow-md hover:bg-gray-700 text-center"
        >
          <h2 className="text-xl font-bold">View New Messages</h2>
          <p>View Message sent by Clients.</p>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminDashboard;


