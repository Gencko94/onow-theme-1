export type OPENING_HOUR = {
  day: string;
  from: string;
  to: string;
};

export interface Branch {
  name: {
    [key: string]: string;
  };
  id: number;
  openingHours: string;
  openNow: boolean;
  directions: {
    [key: string]: string;
  };
  coords: {
    lat: string;
    lng: string;
  };
  value: string;
  isMain: boolean;
}
