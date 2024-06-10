import CheckoutCart from "./CheckoutCart";
import CheckoutDrawer from "./CheckoutDrawer";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutShipping from "./CheckoutShipping";

export default function Checkout() {
  return (
    <div className="flex gap-6 w-full max-w-4xl py-8">
      <div className="gap-y-4 grow flex flex-col h-fit">
        <CheckoutCart />
        <CheckoutShipping />
        <CheckoutPayment />
      </div>
      <div className="min-w-96 sticky top-20 h-fit">
        <CheckoutOrderSummary />
      </div>

      <CheckoutDrawer />
    </div>
  );
}
