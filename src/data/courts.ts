import { Court } from '../types/court';

export const sriLankaCourts: Court[] = [
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
  // ... rest of the courts data
];