export type USER = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  payment: string;
};

export type LOGIN_FORM = {
  phone_number: string;
  password: string;
};
export type REGISTER_FORM = {
  phone_number: string;
  password: string;
  email?: string;
  first_name: string;
  last_name: string;
};
export type LOGIN_RESPONSE = {
  token?: string;
  message?: string;
};
export type REGISTER_RESPONSE = {
  token?: string;
  message?: string;
  user?: USER;
};
