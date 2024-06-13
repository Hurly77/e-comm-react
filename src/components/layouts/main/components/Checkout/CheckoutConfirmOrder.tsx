/* eslint-disable no-console */
import React from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import CheckoutShippingItem from "./CheckoutShippingItem";
import CheckoutCardItem from "./CheckoutCardItem";
import { useCart } from "../../hooks/useCart";
import { Badge, Button, Divider, Image, Spinner } from "@nextui-org/react";
import { toUSD } from "../../../app/helpers/number-helpers";
import { getNumOfItems, getSubtotal } from "../../../app/helpers/cart-helpers";
import useSession from "@/components/layouts/app/hooks/useSession";
import { createPaymentIntent } from "@/lib/sdk/methods";
import { useStripe } from "@stripe/react-stripe-js";
import { createOrder } from "@/lib/sdk/methods/create-order";

export default function CheckoutDrawer() {
  const stripe = useStripe();
  const { cart } = useCart();
  const { session } = useSession();
  const checkoutCtx = React.useContext(CheckoutContext);
  const { selectedPm, selectedAddress } = checkoutCtx;
  const [isLoading, setIsLoading] = React.useState(false);

  const fakeArriveDate = Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));

  async function handleOnCompleteOrder() {
    setIsLoading(true);
    try {
      const user_id = session?.user?.id;
      const pm_id = selectedPm?.id;

      if (!stripe) return console.error("Stripe is missing");
      if (!selectedAddress || !user_id || !pm_id || !cart?.id) {
        return console.error("User ID or Payment Method ID is missing");
      }

      const paymentIntent = await createPaymentIntent({ user_id, pm_id });
      if (!paymentIntent || !paymentIntent.client_secret) return console.error("Payment Intent is missing");

      await createOrder({
        stripe_pm_id: pm_id,
        stripe_pm_intent_id: paymentIntent.id,
        user_id,
        cart_id: cart?.id,
        shipping_address_id: selectedAddress?.id,
      });

      const clientSecret = paymentIntent?.client_secret;
      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000/checkout/status",
        },
      });

      if (error) console.error(error);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!selectedPm?.card || !selectedAddress || !cart) return null;

  const numOfItems = getNumOfItems(cart);
  const subTotal = getSubtotal(cart);
  const salesTax = subTotal * 0.0725;
  const totalPrice = subTotal + salesTax;

  return (
    <div>
      <div className="leading-4">
        <h1 className="text-xl mb-2 font-medium">Shipping Address</h1>
        <div className="uppercase leading-5">
          <CheckoutShippingItem shipping={selectedAddress} />
        </div>
      </div>
      <Divider className="my-2" />
      <div>
        <h1 className="text-xl mb-2 font-medium">Payment Method</h1>
        <CheckoutCardItem card={selectedPm?.card} />
      </div>
      <Divider className="my-2" />
      <div>
        <h1 className="text-xl mb-2 font-medium">Review Items</h1>
        <div className="overflow-y-auto grow space-y-4">
          {cart?.items.map((item) => {
            const { product, quantity } = item;
            const { price, title, thumbnailUrl } = product;

            return (
              <div key={item.id} className="flex gap-4 overflow-visible pl-2 pt-2">
                <Badge size="lg" color="danger" placement="top-left" content={quantity > 1 ? quantity : undefined}>
                  <Image
                    radius="sm"
                    className="min-w-[100px] min-h-[100px] border"
                    height={100}
                    width={100}
                    src={thumbnailUrl}
                    alt=""
                  />
                </Badge>
                <div>
                  <div className="min-w-40 text-sm">
                    <h3 className="font-medium line-clamp-2">{title}</h3>
                    <p className="inline-flex gap-1 items-center w-full">
                      <span className="text-medium block font-medium">{toUSD(price * quantity)}</span>
                      {quantity > 1 && <span className="text-xs text-foreground-400">{toUSD(price)} each</span>}
                    </p>
                  </div>
                  <h4 className="text-success-600">Arrives by {fakeArriveDate}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Divider className="my-2" />
      <div>
        <h1 className="text-xl mb-2 font-medium">Order Summary</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal ({numOfItems} item)</span>
            <span>{toUSD(subTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span>{toUSD(salesTax)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-bold">Total</span>
            <span>{toUSD(totalPrice)}</span>
          </div>
        </div>
      </div>

      <Divider className="my-2" />
      <div className="w-full">
        <Button
          endContent={isLoading && <Spinner color="white" size="sm" />}
          onPress={handleOnCompleteOrder}
          size="lg"
          radius="sm"
          className="w-full text-white"
          color="success"
        >
          Complete Order
        </Button>
      </div>
    </div>
  );
}
