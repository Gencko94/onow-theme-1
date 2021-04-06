import { DELIVERY_ADDRESS } from './Address';
export interface CONTACT_INFO {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

export interface CHECKOUT_FORM extends DELIVERY_ADDRESS, CONTACT_INFO {}
