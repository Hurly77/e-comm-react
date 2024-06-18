import {
  CreateUserShippingAddr,
  createUserShippingAddress,
  updatePaymentMetadata,
  updateUserDefaultPm,
} from "../methods";

interface AfterAddNewPM {
  pmId: string;
  userId: number;
  isDefaultPayment: boolean;
  addressId?: number;
  newAddress?: CreateUserShippingAddr | null;
}

// function to update the the metadata {shipping_address_id} of the payment method
// which is used to store the shipping address of the payment method.
/* NOTE: calling this function to update the payment method may result in quirky behavior
         might later add a way of rolling back the changes if the update fails.
*/
export async function afterAddNewPaymentUpdater(payload: AfterAddNewPM) {
  const { pmId, userId, addressId, isDefaultPayment, newAddress } = payload;
  let pmShippingId = addressId;

  // if during the payment flow the user
  // created a new address, we need to create it.
  if (!pmShippingId && newAddress) {
    const newShippingAddress = await createUserShippingAddress(userId, newAddress);
    pmShippingId = newShippingAddress?.id;
  }

  // since where using stripe, to securely store the payment method
  // we can't update (customer, pm metadata) on the client side, for security reasons.
  // so we need to update the payment method on the server side.
  const [paymentMethod] = await Promise.all([
    pmShippingId ? await updatePaymentMetadata(pmId, { shipping_address_id: pmShippingId }) : undefined,
    isDefaultPayment ? await updateUserDefaultPm(userId, pmId) : undefined,
  ]);

  return { pmShippingId, paymentMethod: paymentMethod };
}
