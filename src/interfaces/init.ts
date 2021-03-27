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
    ar: string;
    en: string;
  };
  logo: string;
};
export type USER = {
  name: string;
  phone: string;
  payment: string;
};
export interface Init {
  store_name: STORE_NAME;
  store_images: STORE_IMAGES;
  store_theme: STORE_THEME;
  payment_methods: PAYMENT_METHOD[];
  order_modes: string[];
  cart_total: string;
  user: USER;
  is_user: boolean;
  categories: number[];
}
