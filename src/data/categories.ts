import { Category } from '../interfaces/categories';

export const categories: Category[] = [
  {
    id: 1,
    image: '/images/cheese.jpg',
    name: {
      ar: 'تشيز برغر',
      en: 'Cheese Burgers',
    },
    slug: 'cheese-burgers',
    products: [
      {
        discount: 2,
        id: 1,
        image: 'd',
        name: { ar: 'd' },
        price: '12',
        sale: false,
        slug: 's',
        description: {
          ar: 'تشيز برغر',
          en: 'Cheese Burgers',
        },
      },
    ],
  },
];
