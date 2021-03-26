import { Branch } from '../interfaces/branch';

export const branches: Branch[] = [
  {
    id: 1,
    name: {
      ar: 'فرع السالمية',
      en: 'Salmiyah Branch',
    },
    openingHours: [
      {
        day: 0,
        from: '6:00',
        to: '18:00',
        closed: false,
      },
      {
        day: 1,
        from: '7:00',
        to: '16:00',
        closed: false,
      },
      {
        day: 2,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 3,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 4,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 5,
        from: '',
        to: '',
        closed: true,
      },
      {
        day: 6,
        from: '7:00',
        to: '23:00',
        closed: false,
      },
    ],
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
    openingHours: [
      {
        day: 0,
        from: '6:00',
        to: '18:00',
        closed: false,
      },
      {
        day: 1,
        from: '7:00',
        to: '16:00',
        closed: false,
      },
      {
        day: 2,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 3,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 4,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 5,
        from: '',
        to: '',
        closed: true,
      },
      {
        day: 6,
        from: '7:00',
        to: '23:00',
        closed: false,
      },
    ],
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
    openingHours: [
      {
        day: 0,
        from: '6:00',
        to: '18:00',
        closed: false,
      },
      {
        day: 1,
        from: '7:00',
        to: '16:00',
        closed: false,
      },
      {
        day: 2,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 3,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 4,
        from: '9:00',
        to: '20:00',
        closed: false,
      },
      {
        day: 5,
        from: '',
        to: '',
        closed: true,
      },
      {
        day: 6,
        from: '7:00',
        to: '23:00',
        closed: false,
      },
    ],
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
