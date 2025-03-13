import React from 'react';
import { Building2, MapPin, Scale, Search, ArrowRight, BookOpen, Gavel, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black-50 to-gray">
      {/* Hero Section */}
      <div className="relative bg-blue-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black-900 to-black-700 opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=r-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Sri Lanka Supreme Court" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Courts Across Sri Lanka</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Locate and access information about courts throughout Sri Lanka with our comprehensive court locator system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/courts" 
                className="inline-flex items-center justify-center bg-white text-blue-700 px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Courts
              </Link>
              <Link 
                to="/ngos" 
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-500 transition-colors"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Find NGOs
              </Link>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-500 transition-colors"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How Our Court Locator Helps You</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides easy access to court information across Sri Lanka, helping citizens, legal professionals, and visitors navigate the judicial system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <MapPin className="h-7 w-7 text-black-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Locate Nearby Courts</h3>
            <p className="text-gray-600">
              Find courts near your location with our interactive map and geolocation features. Get directions and distance information.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Building2 className="h-7 w-7 text-black-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Comprehensive Database</h3>
            <p className="text-gray-600">
              Access information about all types of courts across Sri Lanka, from Supreme Court to Magistrate Courts in every district.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Gavel className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Court Type Filtering</h3>
            <p className="text-gray-600">
              Filter courts by type to find exactly what you're looking for, whether it's a High Court, District Court, or Magistrate Court.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Scale className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Legal Resources</h3>
            <p className="text-gray-600">
              Find essential information about the Sri Lankan judicial system, court procedures, and legal resources.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <BookOpen className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">District Information</h3>
            <p className="text-gray-600">
              Browse courts by district to understand the judicial structure in different regions of Sri Lanka.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <HelpCircle className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Help & Support</h3>
            <p className="text-gray-600">
              Get assistance with navigating the court system and finding the right court for your needs.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Find a Court or NGO?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Use our interactive locator to find courts and legal aid NGOs across Sri Lanka. Filter by district, type, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/courts" 
              className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors"
            >
              Find Courts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/ngos" 
              className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-green-500 transition-colors"
            >
              Find NGOs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Building2 className="h-6 w-6 mr-2" />
                Sri Lanka Court Locator
              </h3>
              <p className="text-gray-400">
                A comprehensive platform to help you navigate the Sri Lankan judicial system.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/courts" className="text-gray-400 hover:text-white transition-colors">Court Locator</Link></li>
                <li><Link to="/ngos" className="text-gray-400 hover:text-white transition-colors">NGO Directory</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Legal Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Judicial System</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Court Procedures</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Legal Aid</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Sri Lanka Court Locator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}