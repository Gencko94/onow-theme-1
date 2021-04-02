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

export interface DELIVERY_LOCATION_LIST {
  province: {
    name: { [key: string]: string };
  };
  areas: {
    name: { [key: string]: string };
  }[];
}
