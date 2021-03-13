export interface Address {
  id?: number;
  coords: {
    lat: number;
    lng: number;
  };
  area: string | undefined;
  mapAddress?: string;
  default?: boolean;

  street: string | undefined;
  floor?: string | undefined;
  block: string | undefined;
  additionalDirections?: string | undefined;
  building?: string | undefined;
}
