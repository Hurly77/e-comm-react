import { getPaymentMethods, getOrders, getUserShippingAddress } from "../methods";

export async function getAccountInfo(userId?: number) {
  if (!userId) return; // return empty object wich will make the values return undefined
  const [orders, { paymentMethods, default_pm_id }, shippingAddress] = await Promise.all([
    getOrders(userId),
    getPaymentMethods(userId),
    getUserShippingAddress(userId),
  ]);

  const defaultPM = paymentMethods?.data?.find((pm) => pm.id === default_pm_id)?.card;

  return {
    orders,
    defaultPM,
    paymentMethods,
    shippingAddress,
    defaultPMId: default_pm_id,
  };
}
