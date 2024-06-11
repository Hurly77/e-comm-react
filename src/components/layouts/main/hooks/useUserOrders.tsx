import useSWR from "swr";
import { getOrderById, getOrders } from "@/lib/sdk/methods";

export function useUserOrders(userId?: number) {
  const fetcher = (userId?: number) => (userId ? getOrders(userId) : undefined);
  const { data, error, isLoading } = useSWR(`user_orders_${userId}`, () => fetcher(userId));

  return { data, error, isLoading };
}

export function useSingleOrder(userId?: number, orderId?: number) {
  const fetcher = () => (orderId && userId ? getOrderById(userId, orderId) : undefined);
  const { data, error, isLoading } = useSWR(`single_${userId}_order_${orderId}`, fetcher);

  return { order: data ? data : undefined, error, isLoading };
}
