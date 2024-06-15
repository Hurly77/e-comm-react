export interface CreateUserShippingAddr {
  first_name: string;
  last_name: string;
  is_default: boolean;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone_number: string;
}
