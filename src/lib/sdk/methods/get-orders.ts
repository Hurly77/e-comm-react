import { OrderModel } from "../models/OrderModel";
import { ecommApi } from "../utility/apis";

export async function getOrders(user_id: number) {
  const response = await ecommApi.get<OrderModel[]>("user_orders", { params: { user_id } });

  return response?.data;
}
