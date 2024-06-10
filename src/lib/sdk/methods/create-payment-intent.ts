import { ecommApi } from "../utility/apis";
import * as Stripe from "@stripe/stripe-js";

export interface CreatePaymentIntentPayload {
  user_id: number;
  pm_id: string;
}

export async function createPaymentIntent(payload: CreatePaymentIntentPayload) {
  const response = await ecommApi.post<Stripe.PaymentIntent, CreatePaymentIntentPayload>("payment_intent", payload);

  return response.data;
}
