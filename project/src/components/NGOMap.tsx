import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ngos } from '../data/ngos';
import type { NGO } from '../types/ngo';
import { MapPin, Filter } from 'lucide-react';

// Fix for default marker icon
import L from 'leaflet';

interface IconDefault extends L.Icon.Default {
  _getIconUrl?: string;
}

// Fix for default marker icon
delete (L.Icon.Default.prototype as IconDefault)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function NGOMap() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Colombo');
  
  const categories = ['all', ...new Set(ngos.map(ngo => ngo.Category))];
  const districts = [...new Set(ngos.map(ngo => ngo.District))];

  const filteredNGOs = ngos.filter(ngo => {
    const categoryMatch = selectedCategory === 'all' || ngo.Category === selectedCategory;
    const districtMatch = ngo.District === selectedDistrict;
    return categoryMatch && districtMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">NGO Directory - {selectedDistrict} District</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district} District
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
              <MapContainer
                center={[6.9271, 79.8612]} // Center of Colombo
                zoom={12}
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
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-lg">{ngo.Name}</h3>
                          <p className="text-sm text-gray-600">{ngo.Category}</p>
                          <p className="text-sm mt-2">{ngo.Description}</p>
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
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">NGO List ({filteredNGOs.length})</h2>
            <div className="space-y-4">
              {filteredNGOs.map((ngo, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold text-lg">{ngo.Name}</h3>
                  <p className="text-sm text-gray-600">{ngo.Category}</p>
                  <p className="text-sm mt-1">{ngo.Description}</p>
                  <div className="mt-2 text-sm">
                    <p><strong>Contact:</strong> {ngo.Contact}</p>
                    <p><strong>Address:</strong> {ngo.Address}</p>
                  </div>
                  {ngo.Website && (
                    <a
                      href={ngo.Website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-block mt-2"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}