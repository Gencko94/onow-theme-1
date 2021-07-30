import axios, { AxiosRequestConfig } from "axios";
import { DELIVERY_ADDRESS } from "../interfaces/Address";
import {
  LOGIN_FORM,
  LOGIN_RESPONSE,
  REGISTER_FORM,
  REGISTER_RESPONSE,
  USER,
} from "../interfaces/auth";
import { Branch, DELIVERY_LOCATION_LIST } from "../interfaces/branch";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_RESPONSE,
  CART_ITEM,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_RESPONSE,
  EDIT_CART_REQUEST,
  GET_CART_RESPONSE,
} from "../interfaces/Cart";
import { Category } from "../interfaces/categories";
import { DEALS, Init } from "../interfaces/init";
import { Product } from "../interfaces/product";

// const uri =
//   process.env.NODE_ENV === 'production'
//     ? 'https://onow-mock-api.herokuapp.com'
//     : 'http://localhost:4000';
export const clientURI = "https://new-version.o-now.net/client-api";
export const uri = "https://onow-mock-api.herokuapp.com";
export const getGeneralInfo = async (): Promise<Init> => {
  const config: AxiosRequestConfig = {
    headers: {
      domain: "spp.test.co",
    },
  };
  const res = await axios.get(`${clientURI}/store`, config);

  return res.data.results;
};
export const getProduct = async (id: string) => {
  // export const getProduct = async (id: string): Promise<Product> => {
  const res = await axios.get(`${uri}/products/${id}`);

  return res.data.resuts;
};
export const getCategory = async (id: number | string): Promise<Category> => {
  const res = await axios.get(`${uri}/categories/${id}`);

  return res.data;
};
export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${uri}/categories`);

  return res.data;
};

export const addToCart = async (
  product: ADD_TO_CART_REQUEST
): Promise<ADD_TO_CART_RESPONSE> => {
  const t = localStorage.getItem("tpid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };

  const res = await axios.post(`${uri}/cart`, product, config);

  return res.data.items;
};
export const addToGuestCart = async (
  product: ADD_TO_CART_REQUEST
): Promise<ADD_TO_CART_RESPONSE> => {
  const localCart = localStorage.getItem("tlclc");
  if (localCart) {
    const newItems = JSON.parse(localCart);
    newItems.push({
      ...product,
    });
    localStorage.setItem("tlclc", JSON.stringify(newItems));
    const res = await axios.post(`${uri}/guest-cart`, {
      items: newItems,
    });
    return res.data.items;
  } else {
    const newItems = [{ ...product }];
    localStorage.setItem("tlclc", JSON.stringify(newItems));
    const res = await axios.post(`${uri}/guest-cart`, {
      items: newItems,
    });
    return res.data.items;
  }
};

export const getGuestCartItems = async (): Promise<GET_CART_RESPONSE> => {
  const localCart = localStorage.getItem("tlclc");
  if (localCart) {
    const res = await axios.post(`${uri}/guest-cart`, {
      items: JSON.parse(localCart),
    });
    return res.data;
  } else {
    localStorage.setItem("tlclc", JSON.stringify([]));
    const res = await axios.post(`${uri}/guest-cart`, {
      items: [],
    });
    return res.data;
  }
};
export const getCartItems = async (): Promise<GET_CART_RESPONSE> => {
  const t = localStorage.getItem("tpid");
  const config = {
    headers: {
      Authorization: `Bearer ${t}`,
    },
  };

  const res = await axios.get(`${uri}/cart`, config);
  console.log(res.data);
  return res.data;
};

export const editCartItem = async ({
  product,
}: {
  product: EDIT_CART_REQUEST;
}): Promise<GET_CART_RESPONSE> => {
  const res = await axios.put(`${uri}/cart/${product.id}`);

  return res.data;
};
export const deleteCartItem = async ({
  id,
}: DELETE_FROM_CART_REQUEST): Promise<DELETE_FROM_CART_RESPONSE> => {
  const res = await axios.delete(`${uri}/cart/${id}`);

  return res.data;
};

export const getBranches = async (): Promise<Branch[]> => {
  const res = await axios.get(`${uri}/branches`);

  return res.data;
};
export const getBranch = async (id: string): Promise<Branch> => {
  const res = await axios.get(`${uri}/branches/${id}`);

  return res.data;
};
export const getAddresses = async (): Promise<DELIVERY_ADDRESS[]> => {
  const res = await axios.get(`${uri}/addresses`);

  return res.data;
};

export const getSingleAddress = async (
  id: string
): Promise<DELIVERY_ADDRESS> => {
  const res = await axios.get(`${uri}/addresses/${id}`);
  return res.data;
};

export const addAddress = async (
  address: DELIVERY_ADDRESS
): Promise<DELIVERY_ADDRESS> => {
  const res = await axios.post(`${uri}/addresses`, { ...address });

  return res.data;
};

export const editAddress = async ({
  address,
}: {
  address: DELIVERY_ADDRESS;
}): Promise<DELIVERY_ADDRESS> => {
  const res = await axios.put(`${uri}/addresses/${address.id}`, { ...address });
  return res.data;
};

export const deleteAddress = async ({
  id,
}: {
  id: number;
}): Promise<DELIVERY_ADDRESS[]> => {
  const res = await axios.delete(`${uri}/addresses/${id}`);

  return res.data;
};
export const getDeals = async (): Promise<DEALS> => {
  const res = await axios.get(`${uri}/deals`);

  return res.data;
};

// Authentication Section

export const getUser = async (): Promise<USER> => {
  const t = localStorage.getItem("tpid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };

  const res = await axios.get(`${uri}/user`, config);
  console.log(res.data);
  return res.data.user;
};
export const userLogin = async (data: LOGIN_FORM): Promise<LOGIN_RESPONSE> => {
  const res = await axios.post(`${uri}/login`, data);

  return res.data;
};
export const userRegister = async (
  data: REGISTER_FORM
): Promise<REGISTER_RESPONSE> => {
  const res = await axios.post(`${uri}/register`, data);

  return res.data;
};
export const getDeliveryLocationList = async (): Promise<
  readonly DELIVERY_LOCATION_LIST[]
> => {
  const res = await axios.get(`${uri}/test`);
  return res.data;
};
