import useSession from "../../app/hooks/useSession";
import { BreadcrumbItem, Breadcrumbs, Image } from "@nextui-org/react";
import { formatDate } from "../helpers/date";
import { toUSD } from "../helpers/number";
import { useSingleOrder } from "../hooks/useUserOrders";
import { getCardBrandImage } from "../helpers/card-brands";
import OrderItemList from "../components/Order/OrderItemList";

export default function SingleOrderPage({ id }: { id?: number }) {
  const { session } = useSession();
  const { order, isLoading } = useSingleOrder(session?.user?.id, id);

  function SummaryItem({ title, value }: { title: string; value: React.ReactNode }) {
    return (
      <div className="p-4 grow">
        <p className="text-foreground-400 py-2">{title}</p>
        <p className="">{value}</p>
      </div>
    );
  }

  function CostSummaryItem({ title, value }: { title: string; value: React.ReactNode }) {
    return (
      <div className="flex justify-between items-center">
        <p>{title}:</p>
        <p>{value}</p>
      </div>
    );
  }

  if (isLoading || !order) return <div>Loading...</div>;
  const { payment_method: pm, shipping_address, order_date, collected_tax, sub_total, total_price } = order;
  const { first_name, last_name, line1, city, country, state, postal_code } = shipping_address;

  const shippingAddress = (
    <div>
      <h1 className="text-lg">
        {first_name} {last_name}
      </h1>
      <div className="uppercase">
        <p>{line1}</p>
        <p>
          {city}, {state} {postal_code}
        </p>
        <p>{country == "US" ? "United States" : country}</p>
      </div>
    </div>
  );

  const paymentMethod = (
    <div className="flex items-center gap-2">
      <Image
        radius="sm"
        className="border"
        src={getCardBrandImage(pm?.display_brand) ?? ""}
        height={20}
        width={50}
        alt="card-brand"
      />
      <div className="">
        <div className="flex text-lg leading-5">
          <h4 className="capitalize">{pm?.display_brand?.split("_").join(" ")}</h4>
          <span>&nbsp;••••&nbsp;{pm?.last4}</span>
        </div>
      </div>
    </div>
  );

  const orderCostSummary = (
    <div>
      <CostSummaryItem title="Subtotal" value={toUSD(sub_total)} />
      <CostSummaryItem title="Shipping" value={toUSD(0)} />
      <CostSummaryItem title="Tax" value={toUSD(collected_tax)} />
      <CostSummaryItem title="Total" value={toUSD(total_price)} />
    </div>
  );

  return (
    <div className="flex items-center flex-col p-6 w-full">
      <div className="w-full max-w-screen-lg space-y-4">
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/account">Your Account</BreadcrumbItem>
            <BreadcrumbItem href="/account/orders">Orders</BreadcrumbItem>
            <BreadcrumbItem href={`/account/orders/${id}`}>Order {id}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div>
          <div className="">
            <h1 className="text-3xl">Order Details</h1>
            <p className="py-2">
              Order Placed: {formatDate(order_date)} | Order# {id}
            </p>
          </div>
          <div className="flex border justify-between rounded w-full">
            <SummaryItem title="Shipping Address" value={shippingAddress} />
            <SummaryItem title="Payment Method" value={paymentMethod} />
            <SummaryItem title="Order Summary" value={orderCostSummary} />
          </div>
        </div>

        <div className="border p-4 rounded">
          <OrderItemList items={order.items} />
        </div>
      </div>
    </div>
  );
}
