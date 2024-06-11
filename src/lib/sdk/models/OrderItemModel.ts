import { OrderModel } from "./OrderModel";
import { ProductModel } from "./ProductModel";

export interface OrderItemModel {
  id: number;
  price: number;
  quantity: number;
  order: OrderModel;
  product: ProductModel;
}
