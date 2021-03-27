import { Product } from './product';

export interface Category {
  name: {
    [key: string]: string;
  };
  id: number;
  image: string;
  slug: string;
  products: Product[];
}
