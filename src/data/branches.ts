import { Branch } from '../interfaces/branch';

export const branches: Branch[] = [
  {
    name: 'Moon Branch',
    openingHours: '4:00 AM - 5:00 PM',
    directions: 'Near the Mars Embassy infront of Tom & Jerry',
    openNow: true,
    image: '/images/map.jpg',
    coordinates: {
      lat: '29.37207021083113',
      lng: '47.97822612037658',
    },
    value: 'moon',
  },
  {
    name: 'Mars Branch',
    openingHours: '7:00 AM - 5:00 PM',
    directions: 'Near the Moon Embassy infront of Pinoccio',
    openNow: false,
    image: '/images/map.jpg',
    coordinates: {
      lat: '29.37207021083113',
      lng: '47.97822612037658',
    },
    value: 'mars',
  },
  {
    name: 'Sun Branch',
    openingHours: 'Forever',
    directions: 'Near the Earth completely infront of Cindrella',
    openNow: true,
    image: '/images/map.jpg',
    coordinates: {
      lat: '29.37207021083113',
      lng: '47.97822612037658',
    },
    value: 'sun',
  },
];
