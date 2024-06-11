import { OrderModel } from "@/lib/sdk/models/OrderModel";
import { Tooltip, Link, Button } from "@nextui-org/react";
import { formatDate } from "../../helpers/date";
import { toUSD } from "../../helpers/number";
import { useRouter } from "next/router";

export default function OrderHeader({ order }: { order: OrderModel }) {
  const router = useRouter();
  const { shipping_address, order_date, total_price } = order;
  const { first_name, last_name, line1, city, state, postal_code } = shipping_address;

  function HeaderItem({ title, value }: { title: string; value: React.ReactNode }) {
    return (
      <div className="p-4">
        <p className="text-foreground-400">{title}:</p>
        <p className="">{value}</p>
      </div>
    );
  }

  const toolTipContent = (
    <div>
      <h1 className="font-medium text-lg">
        {first_name} {last_name}
      </h1>
      <p>{line1}</p>
      <p>
        {city}, {state} {postal_code}
      </p>
    </div>
  );

  const toolTip = (
    <Tooltip size="lg" delay={500} closeDelay={100} placement="bottom-start" radius="sm" content={toolTipContent}>
      <Link>
        {first_name} {last_name}
      </Link>
    </Tooltip>
  );

  return (
    <div className="w-full flex py-2 gap-4 items-center justify-between">
      <div className="flex gap-4">
        <HeaderItem title="Order Number" value={`#${order.id}34232`} />
        <HeaderItem title="Order Date" value={formatDate(order_date)} />
        <HeaderItem title="Total Amount" value={toUSD(total_price)} />
        <HeaderItem title="Ship To" value={toolTip} />
      </div>

      <div>
        <Button onPress={() => router.push(`/account/orders/${order.id}`)} color="primary">
          View Order
        </Button>
      </div>
    </div>
  );
}
