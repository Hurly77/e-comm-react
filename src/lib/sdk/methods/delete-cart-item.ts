import { CartModel } from "../models/CartModel";
import { ecommApi } from "../utility/apis";

interface DeleteCartItemT {
  userId: number;
  cartItemId: string;
}

export async function deleteCartItem(payload: DeleteCartItemT) {
  const response = await ecommApi.delete<CartModel>("cart_item", {
    data: payload,
  });

  return response.data;
}
