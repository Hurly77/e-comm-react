import React from "react";
import { useCart } from "../../hooks/useCart";
import { Spinner } from "@nextui-org/react";
import CartOrderSummary from "./CartOrderSummary";
import CartItemList from "./CartItemList";
import { toUSD } from "../../helpers/number";
import { getSubtotal, getNumOfItems } from "../../helpers/cart-helpers";

export default function Cart() {
  const { cart, isEmpty, isLoading } = useCart();

  if (isLoading || !cart) return <Spinner size="lg" />;

  const subTotal = getSubtotal(cart);
  const numOfItems = getNumOfItems(cart);

  const hasItems = cart.items.length > 0;

  return (
    <div className="flex w-full gap-8 max-w-screen-xl">
      <div className="grow">
        {!isEmpty && (
          <div className="py-4 grow">
            <h1 className="text-3xl font-medium">Cart</h1>
            <span className="text-xl">
              {toUSD(subTotal)} subtotal • {numOfItems} items
            </span>
          </div>
        )}
        <CartItemList />
      </div>
      {hasItems && (
        <div className="grow w-80">
          <CartOrderSummary />
        </div>
      )}
    </div>
  );
}
