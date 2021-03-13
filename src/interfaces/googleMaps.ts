export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
type AddressComponents = AddressComponent[];

export interface GoogleMapsResult {
  address_components: AddressComponents;
  formatted_address: string;
  types: string[];
}

export type GoogleMapsResults = GoogleMapsResult[];
