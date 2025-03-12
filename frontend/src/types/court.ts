export interface Court {
  id: string;
  name: string;
  type: string;
  district: string;
  distance?: number;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}