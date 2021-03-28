export type LOGIN_FORM = {
  phone_number: string;
  password: string;
};
export type REGISTER_FORM = {
  phone_number: string;
  password: string;
  email?: string;
};
export type LOGIN_RESPONSE = {
  token?: string;
  message?: string;
};
export type REGISTER_RESPONSE = {
  token?: string;
  message?: string;
};
