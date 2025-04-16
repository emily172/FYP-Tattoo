import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard/artists" className="hover:text-indigo-400">
                Manage Artists
              </Link>
            </li>
            <li>
              <Link to="/dashboard/gallery" className="hover:text-indigo-400">
                Manage Gallery
              </Link>
            </li>
            <li>
              <Link to="/dashboard/blogs" className="hover:text-indigo-400">
                Manage Blogs
              </Link>
            </li>
            <li>
              <Link to="/dashboard/studio" className="hover:text-indigo-400">
                Manage Studio
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <p>Select a section from the sidebar to manage content.</p>
      </main>
    </div>
  );
}

export default AdminDashboard;

