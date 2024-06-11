import { OrderModel } from "../models/OrderModel";
import { ecommApi } from "../utility/apis";

export interface CreateOrderPayload {
  stripe_pm_id: string;
  stripe_pm_intent_id: string;
  user_id: number;
  cart_id: number;
  shipping_address_id: number;
}

export async function createOrder(payload: CreateOrderPayload) {
  const response = await ecommApi.post<OrderModel, CreateOrderPayload>("order", payload);

  return response.data;
}
