import { Branch } from '../interfaces/branch';

export const branches: Branch[] = [
  {
    id: 1,
    name: {
      ar: 'فرع السالمية',
      en: 'Salmiyah Branch',
    },
    openingHours: '4:00 AM - 5:00 PM',
    directions: {
      ar: 'قرب بلا بلا',
      en: 'Near the Mars Embassy infront of Tom & Jerry',
    },
    openNow: true,
    coords: {
      lat: '29.37207021083113',
      lng: '47.97822612037658',
    },
    value: 'moon',
    isMain: true,
  },
  {
    id: 2,
    name: {
      ar: 'فرع حولي',
      en: 'Hawalli Branch',
    },
    openingHours: '7:00 AM - 5:00 PM',
    directions: {
      ar: 'قرب بلا بلا',
      en: 'Near the Mars Embassy infront of Tom & Jerry',
    },
    openNow: false,
    coords: {
      lat: '29.37207021083113',
      lng: '47.97822612037658',
    },
    value: 'mars',
    isMain: true,
  },
  {
    id: 3,
    name: {
      ar: 'فرع العاصمة',
      en: 'Asimah Branch',
    },
    openingHours: 'Forever',
    directions: {
      ar: 'قرب بلا بلا',
      en: 'Near the Mars Embassy infront of Tom & Jerry',
    },
    openNow: true,
    coords: {
      lat: '29.37207021083113',
      lng: '47.97822612037658',
    },
    value: 'sun',
    isMain: true,
  },
];
