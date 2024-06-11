import { OrderModel } from "@/lib/sdk/models/OrderModel";
import OrderCard from "./OrderCard";

export default function OrderList({ orders }: { orders: OrderModel[] }) {
  return (
    <div className="flex flex-col gap-4 max-w-screen-lg w-full">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
