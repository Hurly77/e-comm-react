import React from "react";
import { Button, Divider, RadioGroup } from "@nextui-org/react";
import RadioCard from "@/components/common/Radio/RadioCard";
import { CheckoutContext } from "../../context/CheckoutContext";
import CheckoutCardItem from "./CheckoutCardItem";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CheckoutCardList() {
  const { paymentMethods, updateToggles, selectedPm, setSelectedPm } = React.useContext(CheckoutContext);

  const paymentCardMethods = paymentMethods.filter((pm) => !!pm.card);

  return (
    <>
      <RadioGroup
        onValueChange={(pm_id) => {
          const selected = paymentCardMethods.find((pm) => pm.id === pm_id);
          if (selected) setSelectedPm(selected);
        }}
        defaultValue={selectedPm?.id ?? ""}
      >
        {paymentCardMethods.map((pm) => (
          <RadioCard key={pm.id} value={pm.id} description={pm.card?.brand}>
            <CheckoutCardItem size="md" key={pm.id} card={pm.card as NonNullable<typeof pm.card>} />
          </RadioCard>
        ))}
      </RadioGroup>
      <Divider className="my-4" />
      <div
        onClick={() => updateToggles("card_form", true)}
        className="h-10 flex items-center pl-4 gap-x-4 cursor-pointer"
      >
        <PlusIcon className="h-8 w-8 stroke-primary" />
        <span>Add payment card</span>
      </div>
      <Divider className="my-4" />
      <Button
        onPress={() => updateToggles("card_list", false)}
        type="submit"
        size="lg"
        className="w-full font-medium text-medium max-h-11"
        radius="sm"
        color="primary"
      >
        Save & Continue
      </Button>
    </>
  );
}
