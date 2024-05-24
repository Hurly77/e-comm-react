import { CartModel } from "../models/CartModel";
import { ecommApi } from "../utility/apis";

export interface UpdateCartItemT {
  userId: number;
  cartItemId: string;
  quantity: number;
}

export async function updateCartItem(payload: UpdateCartItemT) {
  const response = await ecommApi.patch<CartModel>("cart_item", payload);

  return response.data;
}
