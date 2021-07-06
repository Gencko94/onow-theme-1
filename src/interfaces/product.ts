export interface Product {
  image: string;
  name: {
    [key: string]: string;
  };
  gallery: string[];
  category: {
    name: {
      [key: string]: string;
    };
    id: number;
    image: string;
  };
  id: number;
  price: string;
  slug: string;
  sale: boolean;
  discount: number | null;
  description: {
    [key: string]: string;
  };
}
export type ADDON = {
  name: {
    [key: string]: string;
  };
  price: string;
};
