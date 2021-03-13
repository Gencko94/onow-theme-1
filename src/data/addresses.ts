import { Address } from '../interfaces/Address';

export const addresses: Address[] = [
  {
    id: 1,
    coords: {
      lat: 29.31166,
      lng: 47.481766,
    },
    street: 'Street 54',
    avenue: 'Sharq',
    type: 'house',
    block: '5',
    additionalDirections: 'Near the Island Embassy',
    default: true,
    mapAddress: 'Sharq, Bank Bemo',
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
    avenue: 'Sharq',
    type: 'office',
    block: '1',
    default: false,
    mapAddress: 'Sharq, Bank Bemo',
    area: 'Hawali',
    building: '4',
  },
];
