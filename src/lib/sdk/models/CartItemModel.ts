import { CartModel } from "./CartModel";
import { ProductModel } from "./ProductModel";

export interface CartItemModel {
  id: string;
  cart: CartModel;
  quantity: number;
  product: ProductModel;
}
