import { CartModel } from "../models/CartModel";
import { ecommApi } from "../utility/apis";

export async function getCart(userId: number) {
  const response = await ecommApi.get<CartModel>("get_cart", { params: { userId } });
  console.log(response.data);

  return response.data;
}
