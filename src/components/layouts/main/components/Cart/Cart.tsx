import React from "react";
import { useCart } from "../../hooks/useCart";
import { Spinner } from "@nextui-org/react";
import CartOrderSummary from "./CartOrderSummary";
import CartItemList from "./CartItemList";
import { toUSD } from "../../helpers/number";

export default function Cart() {
  const { cart, isLoading } = useCart();

  if (isLoading || !cart) return <Spinner size="lg" />;

  const subTotal = cart?.items?.reduce((acc, { product, quantity }) => acc + quantity * product.price ?? 0, 0);
  const numOfItems = cart?.items?.map((item) => item.quantity).reduce((a, b) => a + b);

  return (
    <div>
      <div className="flex w-full gap-8 max-w-screen-xl">
        <div className="grow">
          <div className="py-4">
            <h1 className="text-3xl font-medium">Cart</h1>
            <span className="text-xl">
              {toUSD(subTotal)} subtotal • {numOfItems} items
            </span>
          </div>
          <CartItemList />
        </div>
        <div className="grow w-80">
          <CartOrderSummary />
        </div>
      </div>
    </div>
  );
}
