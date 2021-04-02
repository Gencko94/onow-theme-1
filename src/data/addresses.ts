import { DELIVERY_ADDRESS } from '../interfaces/Address';

export const addresses: DELIVERY_ADDRESS[] = [
  {
    id: 1,
    coords: {
      lat: 29.31166,
      lng: 47.481766,
    },
    street: 'Street 54',
    block: '5',
    additionalDirections: 'Near the Island Embassy',
    default: true,
    area: 'Salmiyah',
    building: '6',
  },
  {
    id: 2,
    coords: {
      lat: 29.31166,
      lng: 47.481766,
    },
    street: 'Street 60',
    block: '1',
    default: false,
    area: 'Hawali',
    building: '4',
  },
];
