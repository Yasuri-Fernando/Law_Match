import { Link } from 'react-router-dom';
import Location2 from "../assets/location2.jpg";
import Database from "../assets/database.jpeg";
import courttype2 from "../assets/courttype2.jpg";
import legal from "../assets/legal.png";
import district from "../assets/district.jpg";
import help from "../assets/help.png";
import bgImage from "../assets/background2.jpg";


function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-600 p-8 rounded-lg text-white">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );
}

function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`
      }}
    >
        <div className="absolute inset-0 bg-black bg-opacity-10">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-black mb-6">
              Find Courts Across Sri Lanka
            </h1>
            <p className="text-2xl text-white font-bold  mb-8 max-w-2xl whitespace-nowrap">
            Easily find courts and legal resource centers across Sri Lanka with our comprehensive court locator system.
            </p>
            <div className="flex space-x-4">
              <Link to="/courts" className="bg-white text-black-900 px-8 py-3 rounded-lg font-semibold hover:bg-white-100 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Courts
              </Link>
              <Link to="/ngos" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Find NGOs
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      {/* How It Helps Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">How Our Court Locator Helps You</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our platform provides easy access to court information across Sri Lanka, helping citizens, legal professionals, and visitors navigate the judicial system.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              icon={<img src={Location2} alt="Legal Resources" className="w-5 h-5" />}
              title="Locate Nearby Courts"
              description="Find courts near your location with our interactive map and geolocation features. Get directions and distance information."
            />
            <FeatureCard
              icon={<img src={Database} alt="Legal Resources" className="w-5 h-5" />}
              title="Comprehensive Database"
              description="Access information about all types of courts across Sri Lanka, from Supreme Court to Magistrate Courts in every district."
            />
            <FeatureCard
              icon={<img src={courttype2} alt="Legal Resources" className="w-5 h-5" />}
              title="Court Type Filtering"
              description="Find essential information about the Sri Lankan judicial system, court procedures, and legal resources."
            />
            <FeatureCard
              icon={<img src={legal} alt="Legal Resources" className="w-5 h-5" />}
              title="Legal Resources"
              description="Filter courts by type to find exactly what you're looking for, whether it's a High Court, District Court, or Magistrate Court."
            />
            <FeatureCard
              icon={<img src={district} alt="Legal Resources" className="w-7 h-7" />}
              title="District Information"
              description="Browse courts by district to understand the judicial structure in different regions of Sri Lanka."
            />
            <FeatureCard
              icon={<img src={help} alt="Legal Resources" className="w-5 h-5" />}
              title="Help & Support"
              description="Get assistance with navigating the court system and finding the right court for your needs."
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find a Court or NGO?</h2>
          <p className="text-gray-600 mb-8">
            Use our interactive locator to find courts and legal aid NGOs across Sri Lanka. Filter by district, type, and more.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/courts" className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700">
              Find Courts →
            </Link>
            <Link to="/ngos" className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700">
              Find NGOs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;