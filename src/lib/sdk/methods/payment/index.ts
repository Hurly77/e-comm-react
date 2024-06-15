import { ecommApi } from "../../utility/apis";
import { Stripe } from "stripe"; // only used for types
import { CreatePaymentIntentPayload, PaymentMethodsResponse } from "./interfaces";

export async function getSetupIntent(user_id: number) {
  const response = await ecommApi.get<Stripe.SetupIntent>("setup_intent", { params: { user_id } });

  return response.data;
}

export async function getPaymentMethods(user_id: number) {
  const response = await ecommApi.get<PaymentMethodsResponse>("payment_methods", {
    params: { user_id },
  });

  const { paymentMethods, default_pm_id } = response.data ?? {};

  return { paymentMethods, default_pm_id };
}

export async function createPaymentIntent(payload: CreatePaymentIntentPayload) {
  const response = await ecommApi.post<Stripe.PaymentIntent, CreatePaymentIntentPayload>("payment_intent", payload);

  return response.data;
}

export async function updateUserDefaultPm(user_id: number, pm_id: string) {
  const response = await ecommApi.patch("default_pm", { user_id, pm_id });

  return response.data;
}

export * from "./interfaces";
