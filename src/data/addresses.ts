import { Address } from '../interfaces/Address';

export const addresses: Address[] = [
  {
    id: 1,
    coords: {
      lat: 29.31166,
      lng: 47.481766,
    },
    avenue: 'Sharq',
    type: 'house',
    block: '5',
    houseNo: '6',
    additionalDetails: 'Near the Island Embassy',
    default: true,
    mapAddress: 'Sharq, Bank Bemo',
  },
  {
    id: 2,
    coords: {
      lat: 29.31166,
      lng: 47.481766,
    },
    avenue: 'Sharq',
    type: 'office',
    block: '1',
    houseNo: '2',
    default: false,
    mapAddress: 'Sharq, Bank Bemo',
  },
];
