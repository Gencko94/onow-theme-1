export type DELIVERY_ADDRESS = {
  id?: number;
  coords: {
    lat: number;
    lng: number;
  };
  area: string | undefined;
  default?: boolean;

  street: string | undefined;
  floor?: string | undefined;
  block: string | undefined;
  additionalDirections?: string | undefined;
  building?: string | undefined;
};
