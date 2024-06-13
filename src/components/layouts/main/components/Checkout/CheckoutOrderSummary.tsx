import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Button, Card, Divider } from "@nextui-org/react";
import { getNumOfItems, getSubtotal } from "../../../app/helpers/cart-helpers";
import { toUSD } from "../../../app/helpers/number-helpers";
import { useCart } from "../../hooks/useCart";
import { CheckoutContext } from "../../context/CheckoutContext";
import React from "react";

export default function CheckoutOrderSummary() {
  const { cart } = useCart();
  const { checkoutDrawerStates } = React.useContext(CheckoutContext);
  const [, setIsOpen] = checkoutDrawerStates;

  if (!cart) return null;

  const numOfItems = getNumOfItems(cart);
  const subTotal = getSubtotal(cart);
  const salesTax = subTotal * 0.0725;
  const totalPrice = subTotal + salesTax;

  function SummaryItem({ title, subtitle, value }: { title: string; subtitle?: string; value: string | number }) {
    return (
      <div>
        <div className="flex justify-between">
          <span>
            {title}
            {subtitle && (
              <>
                <br />
                <span className="text-sm text-foreground-400 pl-4">{subtitle}</span>
              </>
            )}
          </span>
          <span>{value}</span>
        </div>
      </div>
    );
  }

  return (
    <Card className="px-6 py-5 space-y-4">
      <div className="flex gap-x-2">
        <ListBulletIcon className="h-6 w-6 stroke-primary" />
        <h1 className="text-xl font-medium">Order Summary</h1>
      </div>

      <Divider />

      <div className="space-y-4">
        <SummaryItem title={`Subtotal (${numOfItems} item)`} value={toUSD(subTotal)} />
        <SummaryItem title="Shipping" value={"Free"} />
        <SummaryItem title="Sales Tax" value={toUSD(salesTax)} />
      </div>
      <Divider className="mb-4" />

      <div className="text-xl font-medium">
        <SummaryItem title="Total" value={toUSD(totalPrice)} />
      </div>

      <Divider />

      <Button onClick={() => setIsOpen(true)} color="primary" radius="sm" className="w-full font-medium text-md">
        Place your Order
      </Button>
    </Card>
  );
}
