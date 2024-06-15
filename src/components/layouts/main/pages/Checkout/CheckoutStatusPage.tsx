import { Elements } from "@stripe/react-stripe-js";
import CheckoutStatus from "@/layouts/main/components/Checkout/CheckoutStatus";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "@nextui-org/react";

export default function CheckoutStatusPage() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "");

  return (
    <div className="flex items-center">
      <Elements stripe={stripePromise}>{!stripePromise ? <Spinner size="lg" /> : <CheckoutStatus />}</Elements>
    </div>
  );
}
