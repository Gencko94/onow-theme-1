import { Category } from '../interfaces/categories';

export const categories: Category[] = [
  {
    image: '/images/cheese.jpg',
    title: {
      ar: 'تشيز برغر',
      en: 'Cheese Burgers',
    },
    slug: 'cheese-burgers',
  },
  {
    image: '/images/steak.jpg',
    title: {
      ar: 'ستيك برغر',
      en: 'Steak Burgers',
    },

    slug: 'steak-burgers',
  },
  {
    image: '/images/Vegan.jpg',
    title: {
      ar: 'البرغر النباتي',
      en: 'Vegan Burgers',
    },

    slug: 'vegan-burgers',
  },
  {
    image: '/images/side.jpg',
    title: {
      ar: 'المقبلات',
      en: 'Side Dishes',
    },

    slug: 'side-menu',
  },
  {
    image: '/images/doughnuts.jpg',
    title: {
      ar: 'الدوناتس',
      en: 'Doughnuts',
    },

    slug: 'doughnuts',
  },
  {
    image: '/images/desserts.jpg',
    title: {
      ar: 'الحلويات',
      en: 'Sweets & Desserts',
    },

    slug: 'desserts',
  },
];
