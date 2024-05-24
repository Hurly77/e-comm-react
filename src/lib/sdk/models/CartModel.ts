import { CartItemModel } from "./CartItemModel";

export interface CartModel {
  id: number;
  items: CartItemModel[];
  user: AuthUser;
}
