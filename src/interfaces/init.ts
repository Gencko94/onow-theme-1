import { Product } from './product';

export type STORE_NAME = {
  [key: string]: string;
};
export type STORE_IMAGES = {
  logo: string;
  heroImage_desktop: string;
  heroImage_mobile: string;
};
export type STORE_THEME = {
  primary_color: string;
};
export type PAYMENT_METHOD = {
  name: {
    [key: string]: string;
  };
  id: number;
  logo: string;
};

export type DEALS = {
  title: { [key: string]: string };
  products: Product[];
};
export interface Init {
  store_name: STORE_NAME;
  store_images: STORE_IMAGES;
  store_theme: STORE_THEME;
  payment_methods: PAYMENT_METHOD[];
  order_modes: string[];
  cart_total: string;
  categories: number[];
  deals: DEALS;
}
