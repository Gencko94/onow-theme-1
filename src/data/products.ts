import { Product } from '../interfaces/product';

export const products: Product[] = [
  {
    image: '/images/blackburger.jpg',
    name: 'Black Bun Cheese Burger',
    price: '3 KD',
    slug: 'black-bun',
    description:
      '1 SPICY BUFFALO MAPLE DONUT - 1 ORIGINAL SLIDER - 1 SIDE CHICKS - 1 FRIES',
  },
  {
    image: '/images/meal.jpg',
    name: 'Big Daddy Rockar Meal',
    price: '5 KD',
    slug: 'big-daddy',
    sale: true,
    discount: 18,
    description:
      'CLASSIC BUN - ANGUS BEEF PATTY - AMERICAN CHEDDAR CHEESE - CHOPPED ONIONS - KETCHUP - MUSTARD -  PICKLES',
  },
  {
    image: '/images/combo.jpg',
    name: 'Combo Wombo Big Meal',
    price: '7 KD',
    slug: 'combo-meal',
    description:
      'HAND BREADED CRISPY CHICKEN - ORIGINAL SAUCE - AMERICAN CHEDDAR CHEESE - PICKLES - SHREDDED LETTUCE',
  },
  {
    image: '/images/burger.jpg',
    name: 'Big Mac Burger',
    price: '2 KD',
    slug: 's-burger',
    description:
      'CRISPY POTATO TOTS MADE IN HOUSE SERVED WITH CHIPOTLE DIP (6 PIECES)',
  },
  {
    image: '/images/icecream.jpg',
    name: 'Greek Ice Cream',
    price: '2 KD',
    slug: 'greek-cream',
    description:
      'ANGUS BEEF PATTY - CHOPPED JALAPENOS - BEEF BACON BITS - AMERICAN CHEDDAR CHEESE - FRIZZLED ONIONS & RHS SECRET HOUSE SAUCE',
  },
  {
    image: '/images/wings.jpg',
    name: 'Hot Spicy Wings',
    price: '4 KD',
    slug: 'spicy-wings',
    description:
      'SKIN ON FRIES DRIZZLED WITH CHOPPED JALAPENÕS - BEEF BACON BITS - NATURAL CHEDDAR CHEESE - FRIZZLED ONIONS - RHS MESSY SAUCE',
  },
];
