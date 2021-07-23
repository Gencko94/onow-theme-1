import axios from "axios";
import { uri } from "../queries";

export const editCustomer = async (data: any) => {
  const res = await axios.get(`${uri}/edit-customer`);

  return res.data;
};
