import { Stripe } from "stripe"; // only used for types

// Docs @: https://docs.stripe.com/api/payment_methods/customer_list
export interface PaymentMethodsResponse {
  paymentMethods: Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>;
  default_pm_id: string | Stripe.PaymentMethod;
}

export interface CreatePaymentIntentPayload {
  user_id: number;
  pm_id: string;
}
