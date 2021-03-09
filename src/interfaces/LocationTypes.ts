import { IconType } from 'react-icons/lib';

export type LocationT = 'house' | 'office' | 'apartment';

export type LocationType = {
  title: LocationT;
  Icon: IconType;
};
