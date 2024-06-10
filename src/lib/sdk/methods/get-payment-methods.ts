import { ecommApi } from "../utility/apis";
import { Stripe } from "stripe"; // only used for types

// Docs @: https://docs.stripe.com/api/payment_methods/customer_list
export async function getPaymentMethods(user_id: number) {
  const response = await ecommApi.get<Stripe.ApiList<Stripe.PaymentMethod>>("payment_methods", {
    params: { user_id },
  });

  return response.data;
}
