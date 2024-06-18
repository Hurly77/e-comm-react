import StripeAddress from "@/components/common/Stripe/StripeAddress";
import { UserShippingAddress } from "@/sdk/models/UserShippingAddress";
import { useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { updatePaymentMethodAddress, updateUserShippingAddress } from "@/sdk/methods";
import React from "react";

export default function AccountEditAddressForm({ address, userId }: { address: UserShippingAddress; userId: number }) {
  const elements = useElements();
  const router = useRouter();

  const [isUpdating, setIsUpdating] = React.useState(false);

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsUpdating(true);
      if (!elements) return;
      const { error } = await elements.submit();
      if (error) return;

      const addressElement = elements.getElement("address");
      if (!addressElement) return;
      const { value } = await addressElement.getValue();
      const { firstName, lastName, phone } = value;
      const { line1, line2, city, state, country, postal_code } = value.address;
      const updates = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        line1,
        line2,
        city,
        state,
        postal_code,
        country,
      };

      await updateUserShippingAddress(userId, address.id, updates);
      updatePaymentMethodAddress(userId, address.id);
      router.back();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="max-w-xl">
      <StripeAddress
        onSubmit={handleOnSubmit}
        onCancel={() => router.back()}
        isLoading={isUpdating}
        btnText="Save"
        defaultValues={{
          // name: `${address.first_name} ${address.last_name}`,
          firstName: address.first_name,
          lastName: address.last_name,
          phone: address.phone_number,
          address: {
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
          },
        }}
      />
    </div>
  );
}
