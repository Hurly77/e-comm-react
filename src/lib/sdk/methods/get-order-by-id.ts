import { OrderModel } from "../models/OrderModel";
import { ecommApi } from "../utility/apis";

export async function getOrderById(user_id: number, order_id: number) {
  const response = await ecommApi.get<OrderModel>("single_order", { params: { user_id, order_id } });

  return response?.data;
}
