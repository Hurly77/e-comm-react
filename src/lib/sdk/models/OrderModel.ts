import Stripe from "stripe";
import { OrderStatus } from "../constants/enums";
import { OrderItemModel } from "./OrderItemModel";
import { UserShippingAddress } from "./UserShippingAddress";

export interface OrderModel<PM = NonNullable<Stripe.PaymentMethod["card"]>> {
  id: number;
  order_date: string;
  sub_total: number;
  collected_tax: number;
  total_price: number;
  stripe_pm_id: string;
  stripe_pm_intent_id: string;
  status: OrderStatus;
  user: AuthUser;
  items: OrderItemModel[];
  shipping_address: UserShippingAddress;
  payment_method: PM;
}
