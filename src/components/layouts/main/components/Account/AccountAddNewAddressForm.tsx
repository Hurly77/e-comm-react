import StripeAddress from "@/components/common/Stripe/StripeAddress";
import { createUserShippingAddress } from "@/lib/sdk/methods";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useAccount } from "../../hooks/useAccount";

export default function AccountAddNewAddressForm({ onClose }: { onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { data, mutate } = useAccount();
  const { userId, shipping } = data ?? {};

  const [isDefault, setIsDefault] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!elements || !stripe || !userId) return;

    try {
      const { error } = await elements.submit();
      const addressInfo = elements.getElement("address");

      if (error || !addressInfo) return;

      const { value } = await addressInfo.getValue();
      const { firstName, lastName, phone, address } = value;

      const newAddress = await createUserShippingAddress(userId, {
        first_name: firstName ?? "", // validated in address options on stripe element
        last_name: lastName ?? "", // validated in address options on stripe element
        phone_number: phone ?? "", // validated in address options on stripe element
        ...address,
        is_default: isDefault,
      });

      if (data && newAddress && shipping) {
        await mutate({
          ...data,
          shipping: {
            ...shipping,
            default_id: isDefault ? newAddress.id : shipping?.default_id,
            addresses: [...(shipping?.addresses ?? []), newAddress],
          },
        });
        onClose();
      }

      addressInfo.clear();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error Confirming Shipping Address", error);
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <div>
      <StripeAddress
        onCancel={onClose}
        isLoading={isConfirming}
        setToDefault={setIsDefault}
        onSubmit={handleOnSubmit}
        btnText={"Save"}
      />
    </div>
  );
}
