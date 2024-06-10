import RadioCard from "@/components/common/Radio/RadioCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { RadioGroup, Divider, Button } from "@nextui-org/react";
import React from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import CheckoutShippingItem from "./CheckoutShippingItem";

export default function CheckoutShippingList() {
  const { shippingAddresses, updateToggles, selectedAddress, setSelectedAddress } = React.useContext(CheckoutContext);

  return (
    <>
      <RadioGroup
        defaultValue={selectedAddress?.id?.toString() ?? ""}
        onValueChange={(idStr) => {
          const id = parseInt(idStr);
          const selected = shippingAddresses.find((shipping) => shipping.id === id);
          if (selected) setSelectedAddress(selected);
        }}
      >
        {shippingAddresses.map((shipping) => (
          <RadioCard key={shipping.id} value={shipping.id?.toString()}>
            <CheckoutShippingItem shipping={shipping} />
          </RadioCard>
        ))}
      </RadioGroup>
      <Divider className="my-4" />
      <div
        onClick={() => updateToggles("address_form", true)}
        className="h-10 flex items-center pl-4 gap-x-4 cursor-pointer"
      >
        <PlusIcon className="h-8 w-8 stroke-primary" />
        <span>Add shipping address</span>
      </div>
      <Divider className="my-4" />
      <Button
        onPress={() => updateToggles("address_list", false)}
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
