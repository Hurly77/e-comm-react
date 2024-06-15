import { CartModel } from "../../models/CartModel";
import { ecommApi } from "../../utility/apis";
import type { CreateCartItemT, DeleteCartItemT, UpdateCartItemT } from "./interfaces";

export async function getCart(userId: number) {
  const response = await ecommApi.get<CartModel>("get_cart", { params: { userId } });
  // eslint-disable-next-line no-console
  console.log(response.data);

  return response.data;
}

export async function createCartItem(payload: CreateCartItemT) {
  const response = await ecommApi.post<CartModel, CreateCartItemT>("add_item", payload);

  return response.data;
}

export async function updateCartItem(payload: UpdateCartItemT) {
  const response = await ecommApi.patch<CartModel>("cart_item", payload);

  return response.data;
}

export async function deleteCartItem(payload: DeleteCartItemT) {
  const response = await ecommApi.delete<CartModel>("cart_item", {
    data: payload,
  });

  return response.data;
}

export * from "./interfaces";
