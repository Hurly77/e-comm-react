import { OrderModel } from "@/lib/sdk/models/OrderModel";
import { Card, Divider } from "@nextui-org/react";
import OrderHeader from "./OrderHeader";
import OrderItemList from "./OrderItemList";

export default function OrderCard({ order }: { order: OrderModel }) {
  const { items } = order;

  return (
    <Card key={order.id} className="w-full p-6" radius="sm">
      <div>
        <OrderHeader order={order} />
        <Divider className="mb-4" />
        <OrderItemList items={items} />
      </div>
    </Card>
  );
}
