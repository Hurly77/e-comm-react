import { OrderModel } from "@/lib/sdk/models/OrderModel";
import { Tooltip, Link, Button } from "@nextui-org/react";
import { formatDate } from "../../helpers/date";
import { toUSD } from "../../helpers/number";
import { useRouter } from "next/router";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";

export default function OrderHeader({ order }: { order: OrderModel }) {
  const router = useRouter();
  const { shipping_address, order_date, total_price } = order;
  const { first_name, last_name, line1, city, state, postal_code } = shipping_address;

  function HeaderItem({ title, value, span }: { span: string; title: string; value: React.ReactNode }) {
    return (
      <div className={cls("sm:p-4", span)}>
        <p className="text-foreground-400 text-sm sm:text-base">{title}:</p>
        <p className="text-sm sm:text-base">{value}</p>
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
    <div className="w-full sm:flex py-2 gap-4 sm:items-start items-center justify-between">
      <div className="grid grid-cols-12 sm:flex sm:gap-4 gap-2 w-full">
        <HeaderItem span="col-span-6" title="Order Date" value={formatDate(order_date)} />
        <HeaderItem span="col-span-6" title="Order Number" value={`#${order.id}34232`} />
        <HeaderItem span="col-span-6" title="Total Amount" value={toUSD(total_price)} />
        <HeaderItem span="col-span-6" title="Ship To" value={toolTip} />
      </div>
      <div className="sm:my-0 mt-2 sm:grow inline-flex justify-end">
        <Button radius="sm" onPress={() => router.push(`/account/orders/${order.id}`)} color="primary">
          View Order
        </Button>
      </div>
    </div>
  );
}
