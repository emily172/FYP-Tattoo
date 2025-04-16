import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem('adminToken'); // Check if admin is logged in

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tattoo Studio</h1>
        <div className="space-x-4">
          <Link 
            to="/" 
            className={`hover:text-indigo-500 ${location.pathname === '/' ? 'text-indigo-500' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/gallery" 
            className={`hover:text-indigo-500 ${location.pathname === '/gallery' ? 'text-indigo-500' : ''}`}
          >
            Gallery
          </Link>
          <Link 
            to="/artists" 
            className={`hover:text-indigo-500 ${location.pathname === '/artists' ? 'text-indigo-500' : ''}`}
          >
            Artists
          </Link>
          <Link 
            to="/contact" 
            className={`hover:text-indigo-500 ${location.pathname === '/contact' ? 'text-indigo-500' : ''}`}
          >
            Contact
          </Link>

          {/* Admin Links */}
          {!token ? (
            <>
              <Link 
                to="/register" 
                className={`hover:text-indigo-500 ${location.pathname === '/register' ? 'text-indigo-500' : ''}`}
              >
                Admin Register
              </Link>
              <Link 
                to="/login" 
                className={`hover:text-indigo-500 ${location.pathname === '/login' ? 'text-indigo-500' : ''}`}
              >
                Admin Login
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard" 
                className={`hover:text-indigo-500 ${location.pathname === '/dashboard' ? 'text-indigo-500' : ''}`}
              >
                Admin Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken'); // Logout admin
                  window.location.href = '/login'; // Redirect to login page
                }}
                className="hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
