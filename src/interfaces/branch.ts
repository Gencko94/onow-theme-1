export type OPENING_HOUR = {
  day: number;
  from: string;
  to: string;
  closed: boolean;
};

export interface Branch {
  name: {
    [key: string]: string;
  };
  id: number;
  openingHours: OPENING_HOUR[];
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
