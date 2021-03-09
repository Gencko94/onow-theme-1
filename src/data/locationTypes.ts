import { BsFillHouseFill } from 'react-icons/bs';
import { BiBuilding } from 'react-icons/bi';
import { IoBusinessSharp } from 'react-icons/io5';

import { LocationType } from '../interfaces/LocationTypes';

export const locationTypes: LocationType[] = [
  {
    Icon: BsFillHouseFill,
    title: 'house',
  },
  {
    Icon: BiBuilding,
    title: 'apartment',
  },
  {
    Icon: IoBusinessSharp,
    title: 'office',
  },
];
