import { ecommApi } from "../../utility/apis";
import { Stripe } from "stripe"; // only used for types
import {
  CreatePaymentIntentPayload,
  CreateSetupIntentPayload,
  PaymentMethodsResponse,
  UpdatePaymentMetadataPayload,
  UpdatePaymentMethodPayload,
} from "./interfaces";

export async function getPaymentMethods(user_id: number) {
  const response = await ecommApi.get<PaymentMethodsResponse>("payment_methods", {
    params: { user_id },
  });

  const { paymentMethods, default_pm_id } = response.data ?? {};

  return { paymentMethods, default_pm_id };
}

export async function createSetupIntent(user_id: number) {
  const response = await ecommApi.post<Stripe.SetupIntent, CreateSetupIntentPayload>("setup_intent", {
    user_id,
  });

  return response.data;
}

export async function createPaymentIntent(payload: CreatePaymentIntentPayload) {
  const response = await ecommApi.post<Stripe.PaymentIntent, CreatePaymentIntentPayload>("payment_intent", payload);

  return response.data;
}

export async function updateUserDefaultPm(user_id: number, pm_id: string) {
  const response = await ecommApi.patch("default_pm", { user_id, pm_id });

  return response.data;
}

export async function updatePaymentMethod(updates: UpdatePaymentMethodPayload) {
  const response = await ecommApi.patch<Stripe.PaymentMethod, UpdatePaymentMethodPayload>("update_pm", updates);

  return response;
}

export async function updatePaymentMetadata(pm_id: string, metadata: UpdatePaymentMetadataPayload["metadata"]) {
  const response = await ecommApi.patch<Stripe.PaymentMethod, UpdatePaymentMetadataPayload>("update_pm_metadata", {
    pm_id,
    metadata,
  });

  return response.data;
}

export async function updatePaymentMethodAddress(user_id: number, address_id: number) {
  const response = await ecommApi.patch("update_pm_address", { user_id, address_id });

  return response.data;
}

export async function deletePaymentMethod(pm_id: string) {
  const response = await ecommApi.delete("delete_pm", { params: { pm_id } });
  return response.data;
}

export * from "./interfaces";
