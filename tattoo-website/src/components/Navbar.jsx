import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem('adminToken'); // Check if admin is logged in

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tattoo Studio</h1>
        <div className="space-x-4">
          {/* General User Links */}
          <Link 
            to="/" 
            className={`hover:text-indigo-500 ${location.pathname === '/' ? 'text-indigo-500' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/studio" 
            className={`hover:text-indigo-500 ${location.pathname === '/studio' ? 'text-indigo-500' : ''}`}
          >
            Studio
          </Link>
          <Link 
            to="/history" 
            className={`hover:text-indigo-500 ${location.pathname === '/history' ? 'text-indigo-500' : ''}`}
          >
            History
          </Link>
          <Link 
            to="/gallery" 
            className={`hover:text-indigo-500 ${location.pathname === '/gallery' ? 'text-indigo-500' : ''}`}
          >
            Gallery
          </Link>
          <Link 
            to="/artist" 
            className={`hover:text-indigo-500 ${location.pathname === '/artist' ? 'text-indigo-500' : ''}`}
          >
            Team
          </Link>

          <Link 
            to="/styles" 
            className={`hover:text-indigo-500 ${location.pathname === '/styles' ? 'text-indigo-500' : ''}`}
          >
            Styles
          </Link>


          <Link 
            to="/profiles" 
            className={`hover:text-indigo-500 ${location.pathname === '/profiles' ? 'text-indigo-500' : ''}`}
          >
            Profiles
          </Link>

          <Link 
            to="/faq" 
            className={`hover:text-indigo-500 ${location.pathname === '/faq' ? 'text-indigo-500' : ''}`}
          >
            FAQ
          </Link>

          <Link 
            to="/contact" 
            className={`hover:text-indigo-500 ${location.pathname === '/contact' ? 'text-indigo-500' : ''}`}
          >
            
            Contact
          </Link>
          <Link 
            to="/blogs" 
            className={`hover:text-indigo-500 ${location.pathname === '/blogs' ? 'text-indigo-500' : ''}`}
          >
            Blog
          </Link>

          {/* Admin Links */}
          {token ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
