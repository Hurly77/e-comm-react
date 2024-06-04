import { CartModel } from "@/lib/sdk/models/CartModel";

export function getSubtotal(cart?: CartModel) {
  if (!cart?.items || cart?.items?.length <= 0) return 0;
  const subTotal = cart?.items?.reduce((acc, { product, quantity }) => acc + quantity * product.price ?? 0, 0);

  return subTotal;
}

export function getNumOfItems(cart?: CartModel) {
  if (!cart?.items || cart?.items?.length <= 0) return 0;
  const numOfItems = cart?.items?.map((item) => item.quantity)?.reduce((a, b) => a + b);

  return numOfItems;
}
