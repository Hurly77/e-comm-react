import { getPaymentMethods, getUserShippingAddress } from "../methods";

export async function checkoutFetcher(userId: number) {
  if (!userId) return;
  // eslint-disable-next-line no-console
  console.log("Refetching Checkout Data");

  const [{ paymentMethods, default_pm_id }, { addresses, default_address_id }] = await Promise.all([
    getPaymentMethods(userId),
    getUserShippingAddress(userId),
  ]);

  return { default_pm_id, paymentMethods, addresses, default_address_id };
}
