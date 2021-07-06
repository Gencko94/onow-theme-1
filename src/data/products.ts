import { Product } from "../interfaces/product";

export const products: Product[] = [
  {
    id: 1,
    sale: false,
    discount: 1,
    gallery: [
      "/images/blackburger/jpg",
      "/images/burger.jpg",
      "/images/icecream.jpg",
      "/images/combo.jpg",
    ],
    image: "/images/blackburger.jpg",
    name: {
      ar: "تشيز برغر",
      en: "Cheese Burgers",
    },
    price: "3.000",
    category: {
      id: 1,
      image: "/images/cheese.jpg",
      name: {
        ar: "تشيز برغر",
        en: "Cheese Burgers",
      },
    },
    slug: "black-bun",
    description: {
      en: "1 SPICY BUFFALO MAPLE DONUT - 1 ORIGINAL SLIDER - 1 SIDE CHICKS - 1 FRIES",
      ar: "بلابلا",
    },
  },
  {
    id: 1,
    sale: false,
    discount: 1,
    gallery: [
      "/images/blackburger/jpg",
      "/images/burger.jpg",
      "/images/icecream.jpg",
      "/images/combo.jpg",
    ],
    image: "/images/meal.jpg",
    name: {
      ar: "تشيز برغر",
      en: "Cheese Burgers",
    },
    price: "5.000",
    slug: "big-daddy",
    category: {
      id: 1,
      image: "/images/cheese.jpg",
      name: {
        ar: "تشيز برغر",
        en: "Cheese Burgers",
      },
    },

    description: {
      en: "1 SPICY BUFFALO MAPLE DONUT - 1 ORIGINAL SLIDER - 1 SIDE CHICKS - 1 FRIES",
      ar: "بلابلا",
    },
  },
  {
    id: 1,
    sale: false,
    gallery: [
      "/images/blackburger/jpg",
      "/images/burger.jpg",
      "/images/icecream.jpg",
      "/images/combo.jpg",
    ],
    discount: 1,
    image: "/images/combo.jpg",
    name: {
      ar: "تشيز برغر",
      en: "Cheese Burgers",
    },
    price: "7.000",
    slug: "combo-meal",
    category: {
      id: 1,
      image: "/images/cheese.jpg",
      name: {
        ar: "تشيز برغر",
        en: "Cheese Burgers",
      },
    },
    description: {
      en: "1 SPICY BUFFALO MAPLE DONUT - 1 ORIGINAL SLIDER - 1 SIDE CHICKS - 1 FRIES",
      ar: "بلابلا",
    },
  },
  {
    id: 1,
    sale: false,
    discount: 1,
    image: "/images/burger.jpg",
    name: {
      ar: "تشيز برغر",
      en: "Cheese Burgers",
    },
    gallery: [
      "/images/blackburger/jpg",
      "/images/burger.jpg",
      "/images/icecream.jpg",
      "/images/combo.jpg",
    ],
    price: "2.000",
    slug: "s-burger",
    category: {
      id: 1,
      image: "/images/cheese.jpg",
      name: {
        ar: "تشيز برغر",
        en: "Cheese Burgers",
      },
    },
    description: {
      en: "1 SPICY BUFFALO MAPLE DONUT - 1 ORIGINAL SLIDER - 1 SIDE CHICKS - 1 FRIES",
      ar: "بلابلا",
    },
  },
  {
    id: 1,
    gallery: [
      "/images/blackburger/jpg",
      "/images/burger.jpg",
      "/images/icecream.jpg",
      "/images/combo.jpg",
    ],
    sale: false,
    discount: 1,
    category: {
      id: 1,
      image: "/images/cheese.jpg",
      name: {
        ar: "تشيز برغر",
        en: "Cheese Burgers",
      },
    },
    image: "/images/icecream.jpg",
    name: {
      ar: "تشيز برغر",
      en: "Cheese Burgers",
    },
    price: "2.000",
    slug: "greek-cream",
    description: {
      en: "1 SPICY BUFFALO MAPLE DONUT - 1 ORIGINAL SLIDER - 1 SIDE CHICKS - 1 FRIES",
      ar: "بلابلا",
    },
  },
  {
    id: 1,
    sale: false,
    category: {
      id: 1,
      image: "/images/cheese.jpg",
      name: {
        ar: "تشيز برغر",
        en: "Cheese Burgers",
      },
    },
    discount: 1,
    image: "/images/wings.jpg",
    name: {
      ar: "تشيز برغر",
      en: "Cheese Burgers",
    },
    price: "4.000",
    slug: "spicy-wings",
    description: {
      en: "1 SPICY BUFFALO MAPLE DONUT - 1 ORIGINAL SLIDER - 1 SIDE CHICKS - 1 FRIES",
      ar: "بلابلا",
    },
    gallery: [
      "/images/blackburger/jpg",
      "/images/burger.jpg",
      "/images/icecream.jpg",
      "/images/combo.jpg",
    ],
  },
];
