import { LocationT } from './LocationTypes';

export interface Address {
  id: number;
  coords: {
    lat: number;
    lng: number;
  };
  mapAddress?: string;
  default: boolean;
  type: LocationT;
  houseNo?: string | null;
  officeNo?: string | null;
  street?: string | null;
  floor?: string | null;
  aptNo?: string | null;
  avenue: string | null;
  block: string | null;
  additionalDetails?: string | null;
}
