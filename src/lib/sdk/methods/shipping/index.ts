import { UserShippingAddress } from "../../models/UserShippingAddress";
import { ecommApi } from "../../utility/apis";
import { CreateUserShippingAddr } from "./interfaces";

export async function getUserShippingAddress(user_id: number) {
  const response = await ecommApi.get<UserShippingAddress[]>("user_shipping_address", {
    params: { user_id },
  });

  return response.data;
}

export async function createUserShippingAddress(user_id: number, shippingInfo: CreateUserShippingAddr) {
  const response = await ecommApi.post<UserShippingAddress>("user_shipping_address", shippingInfo, {
    params: { user_id },
  });

  return response.data;
}

export * from "./interfaces";
