import { ecommApi } from "../utility/apis";
import { Stripe } from "stripe"; // only used for types

// Docs @: https://docs.stripe.com/api/payment_methods/customer_list
export interface PaymentMethodsResponse {
  paymentMethods: Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>;
  default_pm_id: string | Stripe.PaymentMethod;
}
export async function getPaymentMethods(user_id: number) {
  const response = await ecommApi.get<PaymentMethodsResponse>("payment_methods", {
    params: { user_id },
  });

  const { paymentMethods, default_pm_id } = response.data ?? {};

  return { paymentMethods, default_pm_id };
}
