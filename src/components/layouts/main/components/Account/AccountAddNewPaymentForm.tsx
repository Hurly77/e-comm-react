import StripePayment from "@/components/common/Stripe/StripePayment";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { createSetupIntent, CreateUserShippingAddr } from "@/lib/sdk/methods";
import { UserShippingAddress } from "@/lib/sdk/models/UserShippingAddress";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useAccount } from "../../hooks/useAccount";
import AddressDisplay from "../Shared/AddressDisplay";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import StripeIntegratedAddress from "@/components/common/Stripe/StripeIntegratedAddress";
import { afterAddNewPaymentUpdater } from "@/lib/sdk/updaters/payment-updaters";
import { Button } from "@nextui-org/react";

export default function AccountAddNewPaymentForm({
  onClose,
  setDefaultPMId,
}: {
  onClose: () => void;
  setDefaultPMId: (id: string) => void;
}) {
  const elements = useElements();
  const stripe = useStripe();
  const { data, mutate } = useAccount();
  const { userId } = data ?? {};
  const { addresses } = data?.shipping ?? {};

  const [confirmingPM, setConfirmingPM] = React.useState(false);
  const [addingNewAddress, setAddingNewAddress] = React.useState(false);
  const [isDefault, setIsDefault] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<UserShippingAddress | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function getAddressInfo() {
    if (!elements || !stripe) return;
    let billingDetails;
    let userShippingAddress: CreateUserShippingAddr | undefined;

    if (selectedAddress) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { first_name, last_name, phone_number, ...address } = selectedAddress;
      const { line1, line2, city, state, postal_code, country } = address;
      billingDetails = {
        name: `${first_name} ${last_name}`,
        phone: phone_number,
        address: { line1, line2, city, state, postal_code, country },
      };
    } else if (addingNewAddress) {
      const addressInfo = elements.getElement("address");
      if (!addressInfo) return;
      const { value } = await addressInfo.getValue();
      const { firstName, lastName, name, phone, ...rest } = value;
      billingDetails = { name, phone, ...rest };

      userShippingAddress = {
        first_name: firstName ?? "",
        last_name: lastName ?? "",
        phone_number: phone ?? "",
        is_default: false,
        ...rest.address,
      };
    }

    return { billingDetails, userShippingAddress };
  }

  function handleErrors(message: string, error?: unknown) {
    // eslint-disable-next-line no-console
    console.error("Error Confirming Setup Intent", error);

    setError(message);
    setTimeout(() => setError(null), 3000);
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!elements || !stripe || !userId) return;
    const { error } = await elements.submit();
    const element = elements.getElement("payment");
    if (error || !element) return;

    try {
      setConfirmingPM(true);
      if (!selectedAddress && !addingNewAddress) {
        return handleErrors("Select or create a new Shipping Address to Continue");
      }

      const { client_secret: clientSecret } = (await createSetupIntent(userId)) ?? {};
      if (!clientSecret) return handleErrors("Error Creating Setup Intent");

      const { billingDetails, userShippingAddress } = (await getAddressInfo()) ?? {};

      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        clientSecret,
        redirect: "if_required",
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_ECOMM_STRIPE_REDIRECT_DOMAIN}/account/payments`,
          payment_method_data: { billing_details: billingDetails },
        },
      });

      if (error) handleErrors("Error Confirming Setup Intent", error);

      const PM = setupIntent?.payment_method;
      const pmId = typeof PM === "string" ? PM : PM?.id;
      if (!pmId) return;

      const { paymentMethod } = await afterAddNewPaymentUpdater({
        pmId,
        userId,
        isDefaultPayment: isDefault,
        addressId: selectedAddress?.id,
        newAddress: userShippingAddress,
      });

      if (data && paymentMethod) {
        await mutate({
          ...data,
          payments: {
            ...data?.payments,
            paymentsMethods: [paymentMethod, ...(data?.payments?.paymentsMethods ?? [])],
            defaultPM: isDefault ? paymentMethod?.card : data?.payments?.defaultPM,
            default_id: isDefault ? paymentMethod.id : data?.payments?.default_id,
          },
        });
        if (isDefault) setDefaultPMId(paymentMethod.id);
      }

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      handleErrors("Error Confirming Setup Intent", error);
    } finally {
      setConfirmingPM(false);
    }
  }

  return (
    <div className="min-h-96 pb-9 relative">
      {error && <div className=" p-2 text-danger text-center">{error}</div>}
      <StripePayment
        isLoading={confirmingPM}
        btnText="Save"
        setToDefault={setIsDefault}
        onSubmit={handleOnSubmit}
        onCancel={onClose}
      >
        {!addingNewAddress && (
          <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-80 custom-scrollbar">
            {addresses &&
              addresses.map((address) => (
                <div
                  className={cls(
                    "border-2 rounded p-2 shadow-small cursor-pointer",
                    address?.id === selectedAddress?.id ? "border-primary border-2" : "border-transparent"
                  )}
                  onClick={() => setSelectedAddress(address)}
                  key={address.id}
                >
                  <AddressDisplay boldedName address={address} />
                </div>
              ))}

            <div
              onClick={() => {
                setAddingNewAddress(true);
                setSelectedAddress(null);
              }}
              className="flex gap-2 border-2 border-transparent hover:border-primary rounded-small shadow-small h-20 items-center p-4 cursor-pointer"
            >
              <PlusCircleIcon className="h-6 w-6 stroke-primary" />
              <span>Add New</span>
            </div>
          </div>
        )}
        {addingNewAddress && (
          <div className="custom-scrollbar space-y-2">
            <StripeIntegratedAddress />
            <Button onClick={() => setAddingNewAddress(false)} variant="light" color="primary" size="sm" radius="sm">
              choose existing address
            </Button>
          </div>
        )}
      </StripePayment>
    </div>
  );
}
