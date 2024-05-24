import { CartModel } from "../models/CartModel";
import { ecommApi } from "../utility/apis";

export interface CreateCartItemT {
  productId: number;
  userId: number;
}

export async function createCartItem(payload: CreateCartItemT) {
  const response = await ecommApi.post<CartModel, CreateCartItemT>("add_item", payload);

  return response.data;
}
