import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 7H17M7 12H17M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xl font-bold">LawMatch Court Locator</span>
            </div>
            <p className="text-gray-400">
              A comprehensive platform to help you navigate the Sri Lankan judicial system.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/courts" className="hover:text-white">Court Locator</Link></li>
              <li><Link to="/ngos" className="hover:text-white">NGO Directory</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/judicial-system" className="hover:text-white">Judicial System</Link></li>
              <li><Link to="/court-procedures" className="hover:text-white">Court Procedures</Link></li>
              <li><Link to="/legal-aid" className="hover:text-white">Legal Aid</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>© 2025 Sri Lanka Court Locator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;