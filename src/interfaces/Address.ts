import { LocationT } from './LocationTypes';

export interface Address {
  id: number;
  coords: {
    lat: number;
    lng: number;
  };
  area: string;
  mapAddress?: string;
  default: boolean;
  type: LocationT;
  street: string | null;
  floor?: string | null;
  avenue: string | null;
  block: string | null;
  additionalDirections?: string | null;
  building: string | null;
}
