import { Product } from "./product";

export interface Category {
  name: {
    [key: string]: string;
  };
  id: number;
  image: string;
  slug: string;
  products: Product[];
}

export interface CATEGORY_WITH_PRODUCTS {
  name: {
    [key: string]: string;
  };
  id: number;
  image: string;
  slug: string;
  products: Product[];
}
