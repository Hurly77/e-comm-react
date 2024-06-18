import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../helpers/date";
import { toUSD } from "../../helpers/number";
import AccountCard from "./AccountCard";
import { Image, Link } from "@nextui-org/react";
import type { OrderModel } from "@/lib/sdk/models/OrderModel";

export default function AccountPurchaseHistory({ orders }: { orders: OrderModel[] }) {
  return (
    <AccountCard
      disablePress
      link="/account/orders"
      title={
        <div className="flex justify-between items-end w-full">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="h-10 w-10 text-primary" />
            <span>Purchase History</span>
          </div>
          <Link color="primary" className="whitespace-nowrap" href="/account/orders">
            View all
          </Link>
        </div>
      }
    >
      <div className="space-y-4">
        {orders &&
          orders.map((order) => {
            const orderItemImages = order.items.map((item) => item.product.thumbnailUrl);
            const totalItems = order.items.reduce((a, b) => a + b.quantity, 0);

            return (
              <div key={order.id} className="flex gap-4 sm:flex-row flex-col">
                <div className="w-fit">
                  <h1 className="text-2xl font-medium w-max">{formatDate(order.order_date)}</h1>
                  <p className="text-foreground-400">
                    {toUSD(order.total_price)} • {totalItems} item
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 grow">
                  {orderItemImages.map((img) => (
                    <Image
                      radius="sm"
                      src={img}
                      fallbackSrc="https://via.placeholder.com/50x50"
                      alt="order image"
                      height={50}
                      width={50}
                      key={img}
                    />
                  ))}
                </div>
                <Link href={`/account/orders/${order.id}`} className="flex items-end">
                  View
                </Link>
              </div>
            );
          })}
      </div>
    </AccountCard>
  );
}
