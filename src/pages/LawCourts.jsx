import { useState, useEffect } from 'react';
import { MapPin, Compass, Building2 } from 'lucide-react';
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

// Complete Sri Lanka courts data
const sriLankaCourts = [
  // Colombo District
  {
    id: '1',
    name: 'Supreme Court of Sri Lanka',
    type: 'Supreme Court',
    district: 'Colombo',
    distance: 0.5,
    address: 'Hulftsdorp Street, Colombo 12',
    coordinates: { lat: 6.9357, lng: 79.8560 }
  },
  {
    id: '2',
    name: 'Court of Appeal',
    type: 'Court of Appeal',
    district: 'Colombo',
    distance: 0.6,
    address: 'Superior Courts Complex, Colombo',
    coordinates: { lat: 6.9359, lng: 79.8558 }
  },
  {
    id: '3',
    name: 'Colombo High Court',
    type: 'High Court',
    district: 'Colombo',
    distance: 1.2,
    address: 'Hulftsdorp Street, Colombo',
    coordinates: { lat: 6.9355, lng: 79.8563 }
  },
  {
    id: '4',
    name: 'Colombo District Court',
    type: 'District Court',
    district: 'Colombo',
    distance: 1.5,
    address: 'District Court Complex, Colombo',
    coordinates: { lat: 6.9352, lng: 79.8565 }
  },
  {
    id: '5',
    name: 'Colombo Magistrate Court',
    type: 'Magistrate Court',
    district: 'Colombo',
    distance: 2.0,
    address: 'Hulftsdorp Street, Colombo',
    coordinates: { lat: 6.9350, lng: 79.8568 }
  },
  {
    id: '6',
    name: 'Commercial High Court',
    type: 'Commercial High Court',
    district: 'Colombo',
    distance: 1.8,
    address: 'Commercial High Court Complex, Colombo',
    coordinates: { lat: 6.9348, lng: 79.8570 }
  },
  
  // Kandy District
  {
    id: '7',
    name: 'Kandy High Court',
    type: 'High Court',
    district: 'Kandy',
    address: 'High Court Complex, Kandy',
    coordinates: { lat: 7.2906, lng: 80.6337 }
  },
  {
    id: '8',
    name: 'Kandy District Court',
    type: 'District Court',
    district: 'Kandy',
    address: 'District Court Complex, Kandy',
    coordinates: { lat: 7.2908, lng: 80.6339 }
  },
  {
    id: '9',
    name: 'Kandy Magistrate Court',
    type: 'Magistrate Court',
    district: 'Kandy',
    address: 'Magistrate Court Complex, Kandy',
    coordinates: { lat: 7.2910, lng: 80.6341 }
  },
  
  // Galle District
  {
    id: '10',
    name: 'Galle High Court',
    type: 'High Court',
    district: 'Galle',
    address: 'High Court Complex, Galle',
    coordinates: { lat: 6.0535, lng: 80.2210 }
  },
  {
    id: '11',
    name: 'Galle District Court',
    type: 'District Court',
    district: 'Galle',
    address: 'District Court Complex, Galle',
    coordinates: { lat: 6.0537, lng: 80.2212 }
  },
  {
    id: '12',
    name: 'Galle Magistrate Court',
    type: 'Magistrate Court',
    district: 'Galle',
    address: 'Magistrate Court Complex, Galle',
    coordinates: { lat: 6.0539, lng: 80.2214 }
  },
  
  // Jaffna District
  {
    id: '13',
    name: 'Jaffna High Court',
    type: 'High Court',
    district: 'Jaffna',
    address: 'High Court Complex, Jaffna',
    coordinates: { lat: 9.6615, lng: 80.0255 }
  },
  {
    id: '14',
    name: 'Jaffna District Court',
    type: 'District Court',
    district: 'Jaffna',
    address: 'District Court Complex, Jaffna',
    coordinates: { lat: 9.6617, lng: 80.0257 }
  },
  {
    id: '15',
    name: 'Jaffna Magistrate Court',
    type: 'Magistrate Court',
    district: 'Jaffna',
    address: 'Magistrate Court Complex, Jaffna',
    coordinates: { lat: 9.6619, lng: 80.0259 }
  },
  
  // Anuradhapura District
  {
    id: '16',
    name: 'Anuradhapura High Court',
    type: 'High Court',
    district: 'Anuradhapura',
    address: 'High Court Complex, Anuradhapura',
    coordinates: { lat: 8.3114, lng: 80.4037 }
  },
  {
    id: '17',
    name: 'Anuradhapura District Court',
    type: 'District Court',
    district: 'Anuradhapura',
    address: 'District Court Complex, Anuradhapura',
    coordinates: { lat: 8.3116, lng: 80.4039 }
  },
  {
    id: '18',
    name: 'Anuradhapura Magistrate Court',
    type: 'Magistrate Court',
    district: 'Anuradhapura',
    address: 'Magistrate Court Complex, Anuradhapura',
    coordinates: { lat: 8.3118, lng: 80.4041 }
  },
  
  // Batticaloa District
  {
    id: '19',
    name: 'Batticaloa High Court',
    type: 'High Court',
    district: 'Batticaloa',
    address: 'High Court Complex, Batticaloa',
    coordinates: { lat: 7.7271, lng: 81.7010 }
  },
  {
    id: '20',
    name: 'Batticaloa District Court',
    type: 'District Court',
    district: 'Batticaloa',
    address: 'District Court Complex, Batticaloa',
    coordinates: { lat: 7.7273, lng: 81.7012 }
  },
  {
    id: '21',
    name: 'Batticaloa Magistrate Court',
    type: 'Magistrate Court',
    district: 'Batticaloa',
    address: 'Magistrate Court Complex, Batticaloa',
    coordinates: { lat: 7.7275, lng: 81.7014 }
  },
  
  // Kurunegala District
  {
    id: '22',
    name: 'Kurunegala High Court',
    type: 'High Court',
    district: 'Kurunegala',
    address: 'High Court Complex, Kurunegala',
    coordinates: { lat: 7.4867, lng: 80.3647 }
  },
  {
    id: '23',
    name: 'Kurunegala District Court',
    type: 'District Court',
    district: 'Kurunegala',
    address: 'District Court Complex, Kurunegala',
    coordinates: { lat: 7.4869, lng: 80.3649 }
  },
  {
    id: '24',
    name: 'Kurunegala Magistrate Court',
    type: 'Magistrate Court',
    district: 'Kurunegala',
    address: 'Magistrate Court Complex, Kurunegala',
    coordinates: { lat: 7.4871, lng: 80.3651 }
  },
  
  // Ratnapura District
  {
    id: '25',
    name: 'Ratnapura High Court',
    type: 'High Court',
    district: 'Ratnapura',
    address: 'High Court Complex, Ratnapura',
    coordinates: { lat: 6.6837, lng: 80.4000 }
  },
  {
    id: '26',
    name: 'Ratnapura District Court',
    type: 'District Court',
    district: 'Ratnapura',
    address: 'District Court Complex, Ratnapura',
    coordinates: { lat: 6.6839, lng: 80.4002 }
  },
  {
    id: '27',
    name: 'Ratnapura Magistrate Court',
    type: 'Magistrate Court',
    district: 'Ratnapura',
    address: 'Magistrate Court Complex, Ratnapura',
    coordinates: { lat: 6.6841, lng: 80.4004 }
  },
  
  // Trincomalee District
  {
    id: '28',
    name: 'Trincomalee High Court',
    type: 'High Court',
    district: 'Trincomalee',
    address: 'High Court Complex, Trincomalee',
    coordinates: { lat: 8.5874, lng: 81.2152 }
  },
  {
    id: '29',
    name: 'Trincomalee District Court',
    type: 'District Court',
    district: 'Trincomalee',
    address: 'District Court Complex, Trincomalee',
    coordinates: { lat: 8.5876, lng: 81.2154 }
  },
  {
    id: '30',
    name: 'Trincomalee Magistrate Court',
    type: 'Magistrate Court',
    district: 'Trincomalee',
    address: 'Magistrate Court Complex, Trincomalee',
    coordinates: { lat: 8.5878, lng: 81.2156 }
  },
  
  // Badulla District
  {
    id: '31',
    name: 'Badulla High Court',
    type: 'High Court',
    district: 'Badulla',
    address: 'High Court Complex, Badulla',
    coordinates: { lat: 6.9934, lng: 81.0550 }
  },
  {
    id: '32',
    name: 'Badulla District Court',
    type: 'District Court',
    district: 'Badulla',
    address: 'District Court Complex, Badulla',
    coordinates: { lat: 6.9936, lng: 81.0552 }
  },
  {
    id: '33',
    name: 'Badulla Magistrate Court',
    type: 'Magistrate Court',
    district: 'Badulla',
    address: 'Magistrate Court Complex, Badulla',
    coordinates: { lat: 6.9938, lng: 81.0554 }
  },
  
  // Matara District
  {
    id: '34',
    name: 'Matara High Court',
    type: 'High Court',
    district: 'Matara',
    address: 'High Court Complex, Matara',
    coordinates: { lat: 5.9549, lng: 80.5550 }
  },
  {
    id: '35',
    name: 'Matara District Court',
    type: 'District Court',
    district: 'Matara',
    address: 'District Court Complex, Matara',
    coordinates: { lat: 5.9551, lng: 80.5552 }
  },
  {
    id: '36',
    name: 'Matara Magistrate Court',
    type: 'Magistrate Court',
    district: 'Matara',
    address: 'Magistrate Court Complex, Matara',
    coordinates: { lat: 5.9553, lng: 80.5554 }
  },
  
  // Ampara District
  {
    id: '37',
    name: 'Ampara High Court',
    type: 'High Court',
    district: 'Ampara',
    address: 'High Court Complex, Ampara',
    coordinates: { lat: 7.2833, lng: 81.6667 }
  },
  {
    id: '38',
    name: 'Ampara District Court',
    type: 'District Court',
    district: 'Ampara',
    address: 'District Court Complex, Ampara',
    coordinates: { lat: 7.2835, lng: 81.6669 }
  },
  {
    id: '39',
    name: 'Ampara Magistrate Court',
    type: 'Magistrate Court',
    district: 'Ampara',
    address: 'Magistrate Court Complex, Ampara',
    coordinates: { lat: 7.2837, lng: 81.6671 }
  },
  
  // Puttalam District
  {
    id: '40',
    name: 'Puttalam High Court',
    type: 'High Court',
    district: 'Puttalam',
    address: 'High Court Complex, Puttalam',
    coordinates: { lat: 8.0344, lng: 79.8283 }
  },
  {
    id: '41',
    name: 'Puttalam District Court',
    type: 'District Court',
    district: 'Puttalam',
    address: 'District Court Complex, Puttalam',
    coordinates: { lat: 8.0346, lng: 79.8285 }
  },
  {
    id: '42',
    name: 'Puttalam Magistrate Court',
    type: 'Magistrate Court',
    district: 'Puttalam',
    address: 'Magistrate Court Complex, Puttalam',
    coordinates: { lat: 8.0348, lng: 79.8287 }
  },
  
  // Kegalle District
  {
    id: '43',
    name: 'Kegalle High Court',
    type: 'High Court',
    district: 'Kegalle',
    address: 'High Court Complex, Kegalle',
    coordinates: { lat: 7.2513, lng: 80.3464 }
  },
  {
    id: '44',
    name: 'Kegalle District Court',
    type: 'District Court',
    district: 'Kegalle',
    address: 'District Court Complex, Kegalle',
    coordinates: { lat: 7.2515, lng: 80.3466 }
  },
  {
    id: '45',
    name: 'Kegalle Magistrate Court',
    type: 'Magistrate Court',
    district: 'Kegalle',
    address: 'Magistrate Court Complex, Kegalle',
    coordinates: { lat: 7.2517, lng: 80.3468 }
  }
];

function LawCourts() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courts] = useState(sriLankaCourts);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 7.8731, lng: 80.7718 }); // Center of Sri Lanka
  const [mapZoom, setMapZoom] = useState(8);

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

  // Get unique districts
  const districts = Array.from(new Set(sriLankaCourts.map(court => court.district))).sort();
  
  // Get unique court types
  const courtTypes = Array.from(new Set(sriLankaCourts.map(court => court.type))).sort();

  // Filter courts based on selected type and district
  const filteredCourts = courts.filter(court => {
    const typeMatch = selectedType === 'all' || court.type === selectedType;
    const districtMatch = selectedDistrict === 'all' || court.district === selectedDistrict;
    return typeMatch && districtMatch;
  });

  // When a district is selected, center the map on that district
  useEffect(() => {
    if (selectedDistrict !== 'all') {
      const districtCourts = courts.filter(court => court.district === selectedDistrict);
      if (districtCourts.length > 0) {
        setMapCenter(districtCourts[0].coordinates);
        setMapZoom(12);
      }
    } else {
      setMapCenter({ lat: 7.8731, lng: 80.7718 });
      setMapZoom(8);
    }
  }, [selectedDistrict, courts]);

  // When a court is selected, center the map on that court
  useEffect(() => {
    if (selectedCourt) {
      setMapCenter(selectedCourt.coordinates);
      setMapZoom(15);
    }
  }, [selectedCourt]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="h-8 w-8 text-black-600" />
            LawMatch Court Locator
          </h1>
          <button
            onClick={getLocation}
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black-700 transition-colors disabled:opacity-50"
          >
            <Compass className="h-5 w-5" />
            {loading ? 'Locating...' : 'Find Nearby Courts'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Districts</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Court Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Court Types</option>
                  {courtTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredCourts.length > 0 ? (
                filteredCourts.map((court) => (
                  <div
                    key={court.id}
                    className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                      selectedCourt?.id === court.id 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-black'
                    }`}
                    onClick={() => setSelectedCourt(court)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{court.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {court.type}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {court.district}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 mt-2">
                          <MapPin className="h-4 w-4" />
                          <span>{court.address}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {court.distance && (
                          <span className="text-sm text-gray-500">{court.distance} km away</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No courts found matching your criteria
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
              {filteredCourts.map((court) => (
                <Marker
                  key={court.id}
                  position={[court.coordinates.lat, court.coordinates.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedCourt(court),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{court.name}</h3>
                      <p className="text-sm text-gray-600">{court.type}</p>
                      <p className="text-sm text-gray-500 mt-1">{court.address}</p>
                      <p className="text-sm text-gray-500 mt-1">{court.district} District</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawCourts;