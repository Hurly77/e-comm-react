import { getPaymentMethods, getOrders, getUserShippingAddress } from "../methods";

export async function getAccountInfo(userId?: number) {
  if (!userId) return; // return empty object wich will make the values return undefined
  const [orders, paymentsData, shippingData] = await Promise.all([
    getOrders(userId),
    getPaymentMethods(userId),
    getUserShippingAddress(userId),
  ]);

  const { paymentMethods, default_pm_id } = paymentsData;
  const { addresses, default_address_id } = shippingData;

  const defaultPM = paymentMethods?.data?.find((pm) => pm.id === default_pm_id)?.card;
  const defaultAddress = addresses?.find((addr) => addr.id === default_address_id);

  return {
    userId,
    orders,
    payments: {
      defaultPM,
      default_id: default_pm_id,
      paymentsMethods: paymentMethods?.data,
    },
    shipping: {
      addresses,
      default_id: default_address_id,
      defaultAddress,
    },
  };
}
