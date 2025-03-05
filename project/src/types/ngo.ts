export interface NGO {
    Name: string;
    Category: string;
    'Focus Areas': string;
    Description: string;
    Website: string;
    Contact: string;
    Address: string;
    Established: string;
    District: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }