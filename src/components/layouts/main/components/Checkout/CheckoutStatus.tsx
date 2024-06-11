import { useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useRouter } from "next/router";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { CheckIcon, Cog6ToothIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Button, Spinner } from "@nextui-org/react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "succeeded":
      return "text-success";
    case "processing":
      return "text-warning";
    case "requires_payment_method":
      return "text-danger";
    default:
      return "text-default";
  }
};

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "succeeded":
      return <CheckIcon className="h-24 w-24 border-2  border-success-200 rounded-full stroke-success p-5" />;
    case "processing":
      return <Cog6ToothIcon className="h-24 w-24" />;
    case "requires_payment_method":
      return <ExclamationTriangleIcon className="h-24 w-24" />;
    default:
      return <ExclamationCircleIcon className="h-24 w-24" />;
  }
}

const ORDER_STATUS_SUBtitle = {
  succeeded: {
    title: "Order Successfully!",
    subtitle: "Thank you for your purchase!",
  },
  processing: {
    title: "Payment processing...",
    subtitle: "You can view your order by clicking the button below.",
  },
  requires_payment_method: {
    title: "Payment failed: Payment method required.",
    subtitle: "Please provide a payment method to complete your order.",
  },

  DEFAULT: {
    title: "Something Went Wrong!",
    subtitle: "Please contact support for further assistance.",
  },
};

export default function CheckoutStatus() {
  const stripe = useStripe();
  const router = useRouter();
  const [status, setStatus] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handlePaymentIntent = React.useCallback(
    async (clientSecret: string) => {
      // eslint-disable-next-line no-console
      if (!stripe) return console.error("Stripe is missing");
      try {
        setIsLoading(true);
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        setStatus(paymentIntent?.status ?? null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [stripe]
  );

  React.useEffect(() => {
    const query = router.query;
    const clientSecret = query.payment_intent_client_secret as string | undefined;

    if (clientSecret) handlePaymentIntent(clientSecret);
  }, [handlePaymentIntent, router.query, stripe]);

  const { title, subtitle } = ORDER_STATUS_SUBtitle[(status as keyof typeof ORDER_STATUS_SUBtitle) || "DEFAULT"];

  return (
    <div className={cls(getStatusColor(status ?? ""), "rounded-sm p-4 text-white")}>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <div className="flex items-center flex-col">
          <StatusIcon status={status ?? ""} />
          <div className="pt-10">
            <h1 className={cls(getStatusColor(status ?? ""), "text-4xl")}>{title}</h1>
            <p className="text-foreground-400 text-center">{subtitle}</p>
          </div>
          <Button
            radius="sm"
            color="success"
            size="lg"
            onClick={() => router.push("/account/orders")}
            className="mt-4 text-white font-medium w-40"
          >
            View Order
          </Button>
        </div>
      )}
    </div>
  );
}
