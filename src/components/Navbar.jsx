import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5C21 3.89543 20.1046 20.1046 21 19V5" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-xl font-bold text-gray-800">LawMatch Court Locator</span>
          </Link>

          {/* Centering the navbar options */}
          <div className="flex-1 flex justify-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/courts" className="text-gray-600 hover:text-gray-900">Court Locator</Link>
            <Link to="/ngos" className="text-gray-600 hover:text-gray-900">NGO Directory</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
