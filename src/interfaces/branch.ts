export interface Branch {
  name: string;
  openingHours: string;
  openNow: boolean;
  directions: string;
  image: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  value: string;
}
