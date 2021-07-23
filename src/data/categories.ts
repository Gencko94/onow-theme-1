import { Category } from "../interfaces/categories";

export const categories = [
  {
    id: 1,
    image: "/images/cheese.jpg",
    name: {
      ar: "تشيز برغر",
      en: "Cheese Burgers",
    },
    products: [
      {
        id: 1,
        image: "/images/cheese.jpg",
        name: {
          en: "Cheese Burger",
          ar: "تشيز برغر",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 2,
        image: "/images/burger.jpg",
        name: {
          en: "Big Mac Burger",
          ar: "برغر بيكغ ماك",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "لحم الأنجوس - صلصة الأوريجينال الخاصة - جبنة امريكان - بيكلز - ريليش - خس - بصل  - طماطم",
        },
      },
      {
        id: 3,
        image: "/images/meal.jpg",
        name: {
          en: "Big Daddy Rockar Meal",
          ar: "بيغ دادي ميل",
        },
        price: "5.000",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 4,
        image: "/images/classic-cheese.jpg",
        name: {
          en: "Classic Cheese Burger",
          ar: "تشيز برغر كلاسيك",
        },
        price: "3.750",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 5,
        image: "/images/mushroom.jpg",
        name: {
          en: "Mushroom Burger",
          ar: "بيف برغر بالفطر",
        },
        price: "5.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 6,
        image: "/images/mushroom-cheese.jpg",
        name: {
          en: "Mushroom Cheese Burger",
          ar: "تشيز برغر بالفطر",
        },
        price: "2.900",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "لحم الأنجوس - صلصة الأوريجينال الخاصة - جبنة امريكان - بيكلز - ريليش - خس - بصل  - طماطم",
        },
      },
    ],
  },
  {
    id: 2,
    image: "/images/steak.jpg",
    name: {
      ar: "برغر بقري",
      en: "Beef Burgers",
    },
    products: [
      {
        id: 1,
        image: "/images/cheese.jpg",
        name: {
          en: "Cheese Burger",
          ar: "تشيز برغر",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 2,
        image: "/images/burger.jpg",
        name: {
          en: "Big Mac Burger",
          ar: "برغر بيكغ ماك",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 3,
        image: "/images/meal.jpg",
        name: {
          en: "Big Daddy Rockar Meal",
          ar: "بيغ دادي ميل",
        },
        price: "5.000",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 4,
        image: "/images/classic-cheese.jpg",
        name: {
          en: "Classic Cheese Burger",
          ar: "تشيز برغر كلاسيك",
        },
        price: "3.750",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 5,
        image: "/images/mushroom.jpg",
        name: {
          en: "Mushroom Burger",
          ar: "بيف برغر بالفطر",
        },
        price: "5.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 6,
        image: "/images/mushroom-cheese.jpg",
        name: {
          en: "Mushroom Cheese Burger",
          ar: "تشيز برغر بالفطر",
        },
        price: "2.900",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
    ],
  },
  {
    id: 3,
    image: "/images/steak.jpg",
    name: {
      ar: "اوريجنال سلايدرز",
      en: "Original Sliders",
    },
    products: [
      {
        id: 1,
        image: "/images/cheese.jpg",
        name: {
          en: "Cheese Burger",
          ar: "تشيز برغر",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 2,
        image: "/images/burger.jpg",
        name: {
          en: "Big Mac Burger",
          ar: "برغر بيكغ ماك",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 3,
        image: "/images/meal.jpg",
        name: {
          en: "Big Daddy Rockar Meal",
          ar: "بيغ دادي ميل",
        },
        price: "5.000",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 4,
        image: "/images/classic-cheese.jpg",
        name: {
          en: "Classic Cheese Burger",
          ar: "تشيز برغر كلاسيك",
        },
        price: "3.750",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 5,
        image: "/images/mushroom.jpg",
        name: {
          en: "Mushroom Burger",
          ar: "بيف برغر بالفطر",
        },
        price: "5.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 6,
        image: "/images/mushroom-cheese.jpg",
        name: {
          en: "Mushroom Cheese Burger",
          ar: "تشيز برغر بالفطر",
        },
        price: "2.900",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
    ],
  },
  {
    id: 3,
    image: "/images/steak.jpg",
    name: {
      ar: "اوريجنال سلايدرز",
      en: "Original Sliders",
    },
    products: [
      {
        id: 1,
        image: "/images/cheese.jpg",
        name: {
          en: "Cheese Burger",
          ar: "تشيز برغر",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 2,
        image: "/images/burger.jpg",
        name: {
          en: "Big Mac Burger",
          ar: "برغر بيكغ ماك",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 3,
        image: "/images/meal.jpg",
        name: {
          en: "Big Daddy Rockar Meal",
          ar: "بيغ دادي ميل",
        },
        price: "5.000",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 4,
        image: "/images/classic-cheese.jpg",
        name: {
          en: "Classic Cheese Burger",
          ar: "تشيز برغر كلاسيك",
        },
        price: "3.750",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 5,
        image: "/images/mushroom.jpg",
        name: {
          en: "Mushroom Burger",
          ar: "بيف برغر بالفطر",
        },
        price: "5.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 6,
        image: "/images/mushroom-cheese.jpg",
        name: {
          en: "Mushroom Cheese Burger",
          ar: "تشيز برغر بالفطر",
        },
        price: "2.900",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
    ],
  },
  {
    id: 3,
    image: "/images/steak.jpg",
    name: {
      ar: "اوريجنال سلايدرز",
      en: "Original Sliders",
    },
    products: [
      {
        id: 1,
        image: "/images/cheese.jpg",
        name: {
          en: "Cheese Burger",
          ar: "تشيز برغر",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 2,
        image: "/images/burger.jpg",
        name: {
          en: "Big Mac Burger",
          ar: "برغر بيكغ ماك",
        },
        price: "2.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 3,
        image: "/images/meal.jpg",
        name: {
          en: "Big Daddy Rockar Meal",
          ar: "بيغ دادي ميل",
        },
        price: "5.000",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 4,
        image: "/images/classic-cheese.jpg",
        name: {
          en: "Classic Cheese Burger",
          ar: "تشيز برغر كلاسيك",
        },
        price: "3.750",
        sale: true,
        discount: 18,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 5,
        image: "/images/mushroom.jpg",
        name: {
          en: "Mushroom Burger",
          ar: "بيف برغر بالفطر",
        },
        price: "5.000",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
      {
        id: 6,
        image: "/images/mushroom-cheese.jpg",
        name: {
          en: "Mushroom Cheese Burger",
          ar: "تشيز برغر بالفطر",
        },
        price: "2.900",
        sale: false,
        discount: null,
        description: {
          en: "Angus Beef Patty - Chopped Jalapenos - Beef Bacon Bits - American Cheddar Cheese - Frizzled Onions",
          ar: "قطعتين من لحمة الأنجوس - جبنة الشيدر الأمريكية - بصل مقطع - كاتشب - ماسترد - بيكلز",
        },
      },
    ],
  },
];
