import { UserShippingAddress } from "../models/UserShippingAddress";
import { ecommApi } from "../utility/apis";

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

export async function createUserShippingAddress(user_id: number, shippingInfo: CreateUserShippingAddr) {
  const response = await ecommApi.post<UserShippingAddress>("user_shipping_address", shippingInfo, {
    params: { user_id },
  });

  return response.data;
}
