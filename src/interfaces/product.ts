export interface Product {
  image: string;
  name: string;
  price: string;
  slug: string;
  sale?: boolean;
  discount?: number;
  description?: string;
}
