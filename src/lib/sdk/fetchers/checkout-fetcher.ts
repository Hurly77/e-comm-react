import { getPaymentMethods, getUserShippingAddress } from "../methods";

export async function checkoutFetcher(userId: number) {
  if (!userId) return;
  // eslint-disable-next-line no-console
  console.log("Refetching Checkout Data");

  const [{ paymentMethods, default_pm_id }, userShippingAddresses] = await Promise.all([
    getPaymentMethods(userId),
    getUserShippingAddress(userId),
  ]);

  return { default_pm_id, paymentMethods, userShippingAddresses };
}
