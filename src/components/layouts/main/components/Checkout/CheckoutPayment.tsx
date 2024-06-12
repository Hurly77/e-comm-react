import StripePayment from "@/components/common/Stripe/StripePayment";
import { CreditCardIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import CheckoutSelectedCard from "./CheckoutCardItem";
import CheckoutCardList from "./CheckoutCardList";
import { getSetupIntent, updateUserDefaultPm } from "@/lib/sdk/methods";

export default function CheckoutPayment() {
  const checkoutCtx = React.useContext(CheckoutContext);
  const stripe = useStripe();
  const elements = useElements();
  const [confirmingPM, setConfirmingPM] = React.useState(false);
  const [isDefault, setIsDefault] = React.useState(false);

  const { selectedPm, userId, formToggles, updateToggles } = checkoutCtx;
  const addressOpen = formToggles.address_list || formToggles.address_form;
  const isPaymentOpen = formToggles.card_list || formToggles.card_form;

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setConfirmingPM(true);
    if (!elements || !stripe) return;
    const { error } = await elements.submit();
    const element = elements.getElement("payment");
    if (error || !element) return;

    try {
      const { client_secret: clientSecret } = (await getSetupIntent(checkoutCtx.userId)) ?? {};
      if (!clientSecret) return alert("Error Creating Setup Intent");

      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        clientSecret,
        redirect: "if_required",
        confirmParams: { return_url: "http://localhost:3000/checkout" },
      });

      if (error) {
        // eslint-disable-next-line no-console
        console.log("Error Confirming Setup Intent", error);
        return alert(error.message);
      }

      if (isDefault && setupIntent.payment_method) {
        const pm = setupIntent.payment_method;
        const pmId = typeof pm === "string" ? pm : pm.id;
        updateUserDefaultPm(userId, pmId);
      }

      await checkoutCtx.mutate((prev) => prev);
      updateToggles("card_form", false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error Confirming Setup Intent", error);
    } finally {
      setConfirmingPM(false);
    }
  }

  const renderCardBody = () => {
    switch (true) {
      case formToggles.card_form:
        return (
          <StripePayment
            isLoading={confirmingPM}
            btnText="Save & Continue"
            onSubmit={handleOnSubmit}
            onCancel={() => updateToggles("card_form", false)}
            setToDefault={setIsDefault}
          />
        );
      case formToggles.card_list:
        return <CheckoutCardList />;

      case selectedPm?.card && !isPaymentOpen:
        return <CheckoutSelectedCard card={selectedPm.card} />;
    }
  };

  return (
    <Card id="payment_method" isDisabled={addressOpen}>
      <CardHeader>
        <div id="card_list" className="flex justify-between w-full">
          <div id="card_form" className="text-lg flex gap-x-2 items-center font-medium">
            <CreditCardIcon className="h-6 w-6 stroke-primary" />
            <h4>Payment</h4>
          </div>
          {!addressOpen && !isPaymentOpen && (
            <div
              onClick={() => updateToggles("card_list", true)}
              className="flex gap-x-2 items-center hover:underline cursor-pointer text-primary"
            >
              <>
                <span>Edit</span>
                <PencilSquareIcon className="h-5 w-5" />
              </>
            </div>
          )}
        </div>
      </CardHeader>
      <div className="px-4">
        <Divider />
      </div>
      <CardBody>{renderCardBody()}</CardBody>
    </Card>
  );
}
