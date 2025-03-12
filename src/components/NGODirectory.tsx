import React, { useState } from 'react';
import { Search, Building, Globe, Heart, Filter, ExternalLink, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ngos } from '../data/ngos';
import type { NGO } from '../types/ngo';

// Create custom icon for markers
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function NGODirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 7.8731, lng: 80.7718 }); // Center of Sri Lanka
  const [mapZoom, setMapZoom] = useState(8);

  // Get unique categories and districts
  const categories = ['all', ...new Set(ngos.map(ngo => ngo.Category))];
  const districts = ['all', ...new Set(ngos.map(ngo => ngo.District))];

  // Filter NGOs based on search, category, and district
  const filteredNGOs = ngos.filter(ngo => {
    const matchesSearch = ngo.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.Description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ngo.Category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || ngo.District === selectedDistrict;
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  // Update map center when district is selected
  React.useEffect(() => {
    if (selectedDistrict !== 'all') {
      const districtNGOs = ngos.filter(ngo => ngo.District === selectedDistrict);
      if (districtNGOs.length > 0 && districtNGOs[0].coordinates) {
        setMapCenter(districtNGOs[0].coordinates);
        setMapZoom(12);
      }
    } else {
      setMapCenter({ lat: 7.8731, lng: 80.7718 });
      setMapZoom(8);
    }
  }, [selectedDistrict]);

  // Update map when NGO is selected
  React.useEffect(() => {
    if (selectedNGO?.coordinates) {
      setMapCenter(selectedNGO.coordinates);
      setMapZoom(15);
    }
  }, [selectedNGO]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">NGO Directory - Sri Lanka</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search NGOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district === 'all' ? 'All Districts' : `${district} District`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
            {filteredNGOs.map((ngo, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedNGO?.Name === ngo.Name ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedNGO(ngo)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{ngo.Name}</h3>
                      <p className="text-sm text-blue-600 mb-2">{ngo.Category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {ngo.Website && (
                        <a
                          href={ngo.Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{ngo.Description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{ngo.Address}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <span>{ngo.District} District</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      <span>{ngo['Focus Areas']}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
            <MapContainer
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredNGOs.map((ngo, index) => (
                ngo.coordinates && (
                  <Marker
                    key={index}
                    position={[ngo.coordinates.lat, ngo.coordinates.lng]}
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setSelectedNGO(ngo),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg">{ngo.Name}</h3>
                        <p className="text-sm text-gray-600">{ngo.Category}</p>
                        <p className="text-sm mt-2">{ngo.Description}</p>
                        {ngo.Website && (
                          <div className="mt-2">
                            <a
                              href={ngo.Website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}