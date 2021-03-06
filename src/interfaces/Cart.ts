export type CART_ITEM = {
  id: number;
  name: {
    [key: string]: string;
  };
  price: string;
  image: string;
  quantity: number;
  // + is Pickup or delivery or both
};

export type GET_CART_RESPONSE = {
  cart_total: string;
  delivery_cost: string;
  cart_subtotal: string;
  products: CART_ITEM[];
};

export type ADD_TO_CART_REQUEST = {
  id: number;
  quantity: number;
  extras?: string; // or Variations
};
export type ADD_TO_CART_RESPONSE = {
  cart_total: string;
  delivery_cost: string;
  cart_subtotal: string;
  products: CART_ITEM[];
};
export type DELETE_FROM_CART_REQUEST = {
  id: number;
};

export type DELETE_FROM_CART_RESPONSE = {
  cart_total: string;
  delivery_cost: string;
  cart_subtotal: string;
  products: CART_ITEM[];
};
export type EDIT_CART_REQUEST = {
  id: number;
  quantity: number;
};
