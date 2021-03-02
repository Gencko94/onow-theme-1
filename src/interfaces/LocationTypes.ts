import { IconType } from 'react-icons/lib';

export type LocationT = 'House' | 'Office' | 'Apartment';

export type LocationType = {
  title: LocationT;
  Icon: IconType;
};
