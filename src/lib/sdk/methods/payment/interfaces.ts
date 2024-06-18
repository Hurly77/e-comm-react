import { Stripe } from "stripe"; // only used for types

// Docs @: https://docs.stripe.com/api/payment_methods/customer_list
export interface PaymentMethodsResponse {
  paymentMethods: Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>;
  default_pm_id: string;
}

export interface CreateSetupIntentPayload {
  user_id: number;
}

export interface CreatePaymentIntentPayload {
  user_id: number;
  pm_id: string;
}

export interface UpdatePaymentMethodPayload {
  pm_id: string;
  user_id: number;
  shipping_address_id?: number;
  set_as_default?: boolean;
  card?: Partial<{
    exp_month: number;
    exp_year: number;
  }>;
}

export interface UpdatePaymentMetadataPayload {
  pm_id: string;
  metadata: {
    shipping_address_id: number;
  };
}
