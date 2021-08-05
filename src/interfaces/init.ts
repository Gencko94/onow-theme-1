import { Product } from "./product";

export type STORE_NAME = {
  [key: string]: string;
};
export type STORE_IMAGES = {
  logo: string;
  favIcon: string;
};
export type STORE_THEME = {
  primary_color: string;
  header_type: "photo" | "slider" | "video";
  photo_url: string;
  images_url: string[];
  video_url: string;
  product_view: "bar" | "grid" | "list";
};
export type PAYMENT_METHOD = {
  name: {
    [key: string]: string;
  };
  id: number;
  logo: string;
};
export type STORE_COUNTRY = {
  id: number;
  name: { [key: string]: string };
  currency: { [key: string]: string };
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
  country: STORE_COUNTRY;
  categories: number[];
  deals: DEALS;
}
