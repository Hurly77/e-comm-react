import { ecommApi } from "../utility/apis";
import { UserShippingAddress } from "../models/UserShippingAddress";

export async function getUserShippingAddress(user_id: number) {
  const response = await ecommApi.get<UserShippingAddress[]>("user_shipping_address", {
    params: { user_id },
  });

  return response.data;
}
