import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import StripeAddress from "@/components/common/Stripe/StripeAddress";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PencilSquareIcon, TruckIcon } from "@heroicons/react/24/outline";
import { CheckoutContext } from "../../context/CheckoutContext";
import React from "react";
import CheckoutSelectedShipping from "./CheckoutShippingItem";
import CheckoutShippingList from "./CheckoutShippingList";

export default function CheckoutShipping() {
  const checkoutCtx = React.useContext(CheckoutContext);

  const stripe = useStripe();
  const elements = useElements();

  const [isDefault, setIsDefault] = React.useState(false);
  const [confirmingShipping, setConfirmingPM] = React.useState(false);
  const { formToggles, updateToggles, selectedAddress } = checkoutCtx;
  const paymentFormOpen = formToggles.card_list || formToggles.card_form;
  const isEditingAddress = formToggles.address_form || formToggles.address_list;

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!elements || !stripe) return;

    try {
      const { error } = await elements.submit();
      const addressInfo = elements.getElement("address");

      if (error || !addressInfo) return;

      const { value } = await addressInfo.getValue();
      const { firstName, lastName, phone, address } = value;

      await checkoutCtx.addNewAddress({
        first_name: firstName ?? "", // validated in address options on stripe element
        last_name: lastName ?? "", // validated in address options on stripe element
        phone_number: phone ?? "", // validated in address options on stripe element
        ...address,
        is_default: isDefault,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error Confirming Shipping Address", error);
      setConfirmingPM(false);
    }

    updateToggles("address_form", false);
  }

  const renderCardBody = () => {
    switch (true) {
      case formToggles.address_form:
        return (
          <StripeAddress
            isLoading={confirmingShipping}
            btnText="Save & Continue"
            setToDefault={setIsDefault}
            onSubmit={handleOnSubmit}
            onCancel={() => updateToggles("address_form", false)}
          />
        );
      case formToggles.address_list:
        return <CheckoutShippingList />;
      case !isEditingAddress && selectedAddress !== null:
        return <CheckoutSelectedShipping shipping={selectedAddress} />;
    }
  };

  return (
    <Card id="shipping_address" className="overflow-visible" isDisabled={paymentFormOpen}>
      <CardHeader>
        <div className="flex justify-between w-full">
          <div id="address_form" className="text-lg font-medium flex gap-x-2 items-center">
            <TruckIcon className="h-6 w-6 stroke-primary" />
            <h4 id="address_list">Shipping Address</h4>
          </div>
          {!isEditingAddress && !paymentFormOpen && (
            <div
              onClick={() => updateToggles("address_list", true)}
              className="flex gap-x-2 items-center hover:underline cursor-pointer text-primary"
            >
              <span>Edit</span>
              <PencilSquareIcon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardHeader>
      <div className="px-4">
        <Divider />
      </div>
      <CardBody className="overflow-visible">{renderCardBody()}</CardBody>
    </Card>
  );
}
