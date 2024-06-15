import { OrderModel } from "../../models/OrderModel";
import { ecommApi } from "../../utility/apis";
import type { CreateOrderPayload } from "./interfaces";

export async function getOrders(user_id: number) {
  const response = await ecommApi.get<OrderModel[]>("user_orders", { params: { user_id } });

  return response?.data;
}

export async function getOrderById(user_id: number, order_id: number) {
  const response = await ecommApi.get<OrderModel>("single_order", { params: { user_id, order_id } });

  return response?.data;
}

export async function createOrder(payload: CreateOrderPayload) {
  const response = await ecommApi.post<OrderModel, CreateOrderPayload>("order", payload);

  return response.data;
}

export * from "./interfaces";
