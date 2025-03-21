import { useState } from 'react';
import { Building2, Search, MapPin, Phone, Mail, Globe, Compass } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

const legalNGOs = [
  {
    id: 1,
    name: 'Legal Aid Commission of Sri Lanka',
    description: 'Provides free legal assistance to underprivileged citizens',
    address: 'Hulftsdorp Street, Colombo 12',
    contact: '+94 11 2433668',
    email: 'info@legalaid.lk',
    website: 'www.legalaid.lk',
    district: 'Colombo',
    coordinates: { lat: 6.9357, lng: 79.8560 },
    focusAreas: ['Legal Aid', 'Human Rights', 'Access to Justice'],
    services: [
      'Free legal consultation',
      'Court representation',
      'Legal awareness programs',
      'Legal documentation assistance'
    ]
  },
  {
    id: 2,
    name: 'Transparency International Sri Lanka',
    description: 'Works towards eliminating corruption and promoting transparency in legal processes',
    address: '5/1 Elibank Road, Colombo 05',
    contact: '+94 11 2501474',
    email: 'info@tisrilanka.org',
    website: 'www.tisrilanka.org',
    district: 'Colombo',
    coordinates: { lat: 6.8964, lng: 79.8584 },
    focusAreas: ['Anti-corruption', 'Legal Reform', 'Good Governance'],
    services: [
      'Corruption reporting system',
      'Legal advocacy',
      'Public interest litigation',
      'Policy research'
    ]
  },
  {
    id: 3,
    name: 'Centre for Policy Alternatives',
    description: 'Strengthening civil society through legal advocacy and research',
    address: '24/2 28th Lane, Colombo 03',
    contact: '+94 11 2565304',
    email: 'info@cpalanka.org',
    website: 'www.cpalanka.org',
    district: 'Colombo',
    coordinates: { lat: 6.8912, lng: 79.8528 },
    focusAreas: ['Constitutional Law', 'Human Rights', 'Legal Research'],
    services: [
      'Legal research and advocacy',
      'Constitutional reform initiatives',
      'Public interest litigation',
      'Legal education programs'
    ]
  },
  {
    id: 4,
    name: 'INFORM Human Rights Documentation Centre',
    description: 'Monitoring and documenting human rights violations and providing legal assistance',
    address: '5 Jayaratne Avenue, Colombo 05',
    contact: '+94 11 2789360',
    email: 'inform@inform.lk',
    website: 'www.inform.lk',
    district: 'Colombo',
    coordinates: { lat: 6.8889, lng: 79.8573 },
    focusAreas: ['Human Rights', 'Legal Documentation', 'Advocacy'],
    services: [
      'Human rights monitoring',
      'Legal documentation assistance',
      'Advocacy campaigns',
      'Legal aid referrals'
    ]
  },
  {
    id: 5,
    name: 'Law & Society Trust',
    description: 'Promoting legal awareness and human rights through research and advocacy',
    address: '3 Kynsey Terrace, Colombo 08',
    contact: '+94 11 2684845',
    email: 'lst@lstlanka.org',
    website: 'www.lstlanka.org',
    district: 'Colombo',
    coordinates: { lat: 6.9014, lng: 79.8712 },
    focusAreas: ['Legal Research', 'Human Rights', 'Social Justice'],
    services: [
      'Legal research publications',
      'Human rights education',
      'Legal advocacy',
      'Community legal empowerment'
    ]
  },
  {
    id: 8,
    name: 'Foundation for Human Rights Initiative',
    description: 'Promoting human rights and legal education in rural areas',
    address: 'Temple Road, Kandy',
    contact: '+94 81 2234567',
    email: 'info@fhri.lk',
    website: 'www.fhri.lk',
    district: 'Kandy',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    focusAreas: ['Human Rights', 'Legal Education', 'Rural Development'],
    services: [
      'Rural legal aid clinics',
      'Human rights education',
      'Legal awareness workshops',
      'Community legal support'
    ]
  },
  {
    id: 9,
    name: 'Lawyers for Human Rights and Development',
    description: 'Providing legal assistance and promoting human rights awareness',
    address: 'Main Street, Galle',
    contact: '+94 91 2234567',
    email: 'info@lhrd.lk',
    website: 'www.lhrd.lk',
    district: 'Galle',
    coordinates: { lat: 6.0535, lng: 80.2210 },
    focusAreas: ['Human Rights', 'Legal Development', 'Access to Justice'],
    services: [
      'Pro bono legal services',
      'Rights awareness programs',
      'Legal consultation',
      'Case documentation'
    ]
  },
  {
    id: 10,
    name: 'Legal Rights Foundation',
    description: 'Supporting access to justice and legal rights education',
    address: 'Hospital Road, Jaffna',
    contact: '+94 21 2234567',
    email: 'info@lrf.lk',
    website: 'www.lrf.lk',
    district: 'Jaffna',
    coordinates: { lat: 9.6615, lng: 80.0255 },
    focusAreas: ['Legal Rights', 'Access to Justice', 'Community Law'],
    services: [
      'Legal aid services',
      'Community legal education',
      'Rights advocacy',
      'Dispute resolution'
    ]
  }
];

function LegalNGOs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedFocusArea, setSelectedFocusArea] = useState('all');
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 7.8731, lng: 80.7718 }); // Center of Sri Lanka
  const [mapZoom, setMapZoom] = useState(8);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get unique districts
  const districts = Array.from(new Set(legalNGOs.map(ngo => ngo.district))).sort();

  // Get unique focus areas
  const focusAreas = Array.from(
    new Set(legalNGOs.flatMap(ngo => ngo.focusAreas))
  ).sort();

  // Filter NGOs based on search term, district, and focus area
  const filteredNGOs = legalNGOs.filter(ngo => {
    const matchesSearch = 
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.services.some(service => 
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDistrict = 
      selectedDistrict === 'all' || ngo.district === selectedDistrict;

    const matchesFocusArea = 
      selectedFocusArea === 'all' || 
      ngo.focusAreas.includes(selectedFocusArea);

    return matchesSearch && matchesDistrict && matchesFocusArea;
  });

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setLoading(false);
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setMapZoom(10);
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="h-8 w-8 text-black-600" />
            Legal NGOs in Sri Lanka
          </h1>
          <button
            onClick={getLocation}
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition-colors disabled:opacity-50"
          >
            <Compass className="h-5 w-5" />
            {loading ? 'Locating...' : 'Find Nearby NGOs'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search NGOs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedFocusArea}
              onChange={(e) => setSelectedFocusArea(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Focus Areas</option>
              {focusAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredNGOs.length > 0 ? (
              filteredNGOs.map((ngo) => (
                <div
                  key={ngo.id}
                  className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                    selectedNGO?.id === ngo.id 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-black'
                  }`}
                  onClick={() => {
                    setSelectedNGO(ngo);
                    setMapCenter(ngo.coordinates);
                    setMapZoom(15);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{ngo.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {ngo.focusAreas.map((area, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 mt-2">
                        <MapPin className="h-4 w-4" />
                        <span>{ngo.address}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{ngo.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No NGOs found matching your criteria
              </div>
            )}
          </div>
        </div>

        <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredNGOs.map((ngo) => (
              <Marker
                key={ngo.id}
                position={[ngo.coordinates.lat, ngo.coordinates.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => setSelectedNGO(ngo),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{ngo.name}</h3>
                    <p className="text-sm text-gray-600">{ngo.district}</p>
                    <p className="text-sm text-gray-500 mt-1">{ngo.address}</p>
                    <p className="text-sm text-gray-500 mt-1">{ngo.contact}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default LegalNGOs;