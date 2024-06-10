export interface UserShippingAddress {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  is_default: boolean;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
