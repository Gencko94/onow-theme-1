import axios from 'axios';
import { AddToCartRequest } from '../interfaces/AddRequest';
import { Address } from '../interfaces/Address';
import { CartItem } from '../interfaces/cartitem';
import { Product } from '../interfaces/product';

const uri = 'http://localhost:3001';

export const getProduct = async (id: string): Promise<Product> => {
  const res = await axios.get(`${uri}/products/${id}`);

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
