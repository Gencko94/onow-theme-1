import axios from 'axios';
import { AddToCartRequest } from '../interfaces/AddRequest';
import { Address } from '../interfaces/Address';
import { Branch } from '../interfaces/branch';
import { CartItem } from '../interfaces/cartitem';
import { Category } from '../interfaces/categories';
import { Init } from '../interfaces/init';
import { Product } from '../interfaces/product';

// const uri =
//   process.env.NODE_ENV === 'production'
//     ? 'https://onow-mock-api.herokuapp.com'
//     : 'localhost:3001';
const uri = 'https://onow-mock-api.herokuapp.com';
export const getGeneralInfo = async (): Promise<Init> => {
  const res = await axios.get(`${uri}/init`);

  return res.data;
};
export const getProduct = async (id: string): Promise<Product> => {
  const res = await axios.get(`${uri}/products/${id}`);

  return res.data;
};
export const getCategory = async (id: number | string): Promise<Category> => {
  const res = await axios.get(`${uri}/categories/${id}`);

  return res.data;
};

export const addToCart = async (
  product: AddToCartRequest
): Promise<CartItem[]> => {
  const res = await axios.post(`${uri}/cart`, product);

  return res.data.items;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const res = await axios.get(`${uri}/cart`);
  console.log(res.data);
  return res.data;
};

export const editCartItem = async ({
  product,
}: {
  product: CartItem;
}): Promise<CartItem> => {
  const res = await axios.put(`${uri}/cart/${product.id}`);

  return res.data;
};
export const deleteCartItem = async ({
  id,
}: {
  id: number;
}): Promise<CartItem> => {
  const res = await axios.delete(`${uri}/cart/${id}`);

  return res.data.items;
};

export const getBranches = async (): Promise<Branch[]> => {
  const res = await axios.get(`${uri}/branches`);

  return res.data;
};
export const getBranch = async (id: string): Promise<Branch> => {
  const res = await axios.get(`${uri}/branches/${id}`);

  return res.data;
};
export const getAddresses = async (): Promise<Address[]> => {
  const res = await axios.get(`${uri}/addresses`);

  return res.data;
};

export const getSingleAddress = async (id: string): Promise<Address> => {
  const res = await axios.get(`${uri}/addresses/${id}`);
  return res.data;
};

export const addAddress = async (address: Address): Promise<Address> => {
  const res = await axios.post(`${uri}/addresses`, { ...address });

  return res.data;
};

export const editAddress = async ({
  address,
}: {
  address: Address;
}): Promise<Address> => {
  const res = await axios.put(`${uri}/addresses/${address.id}`, { ...address });
  return res.data;
};

export const deleteAddress = async ({
  id,
}: {
  id: number;
}): Promise<Address[]> => {
  const res = await axios.delete(`${uri}/addresses/${id}`);

  return res.data;
};
