import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

