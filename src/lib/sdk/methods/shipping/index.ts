import { UserShippingAddress } from "../../models/UserShippingAddress";
import { ecommApi } from "../../utility/apis";
import { CreateUserShippingAddr, UserShippingAddressResponse } from "./interfaces";

export async function getUserShippingAddress(user_id: number) {
  const response = await ecommApi.get<UserShippingAddressResponse>("user_shipping_address", {
    params: { user_id },
  });

  const { addresses, default_address_id } = response.data ?? {};

  return { addresses, default_address_id };
}

export async function getAddressById(shipping_address_id: number, user_id: number) {
  const response = await ecommApi.get<UserShippingAddress>("user_shipping_address_by_id", {
    params: { shipping_address_id, user_id },
  });

  return response?.data;
}

export async function createUserShippingAddress(user_id: number, shippingInfo: CreateUserShippingAddr) {
  const response = await ecommApi.post<UserShippingAddress>("user_shipping_address", shippingInfo, {
    params: { user_id },
  });

  return response.data;
}

export async function updateDefaultShippingAddress(user_id: number, shipping_address_id: number) {
  const response = await ecommApi.patch<UserShippingAddress>(
    "default_shipping_address",
    {},
    { params: { user_id, shipping_address_id } }
  );

  return response.data ?? {};
}

export async function updateUserShippingAddress(
  user_id: number,
  shipping_address_id: number,
  shippingInfo: Partial<CreateUserShippingAddr>
) {
  const response = await ecommApi.patch<UserShippingAddress>("user_shipping_address", shippingInfo, {
    params: { user_id, shipping_address_id },
  });

  return response.data;
}

export async function deleteUserShippingAddress(shipping_address_id: number) {
  const response = await ecommApi.delete<UserShippingAddress>("delete_shipping_address", {
    params: { shipping_address_id },
  });

  return response.data;
}

export * from "./interfaces";
