import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
import { Button, Checkbox } from "@nextui-org/react";
import { ContactOption, StripeAddressElementOptions } from "@stripe/stripe-js";
import { StripeElementProps } from "./types";

export interface StripeAddressT extends StripeElementProps {
  integrated?: boolean;
  defaultValues?: StripeAddressElementOptions["defaultValues"];
  contacts?: ContactOption[];
}

export default function StripeAddress(props: StripeAddressT) {
  const { onSubmit, onCancel, setToDefault, isLoading, btnText, contacts } = props;

  const [isReady, setIsReady] = React.useState(false);

  return (
    <form onSubmit={onSubmit}>
      <AddressElement
        onReady={() => setIsReady(true)}
        options={{
          mode: "billing",
          fields: { phone: "always" },
          defaultValues: props.defaultValues,
          contacts,
          validation: { phone: { required: "always" } },
          display: {
            name: "split",
          },
          autocomplete: {
            mode: "google_maps_api",
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
          },
        }}
      />
      {isReady && (
        <>
          <Checkbox onValueChange={setToDefault} className="my-1" name="saveAddress">
            set as default address
          </Checkbox>
          <div className="flex items-center gap-4">
            <Button
              isDisabled={isLoading}
              onPress={onCancel}
              size="lg"
              radius="sm"
              variant="ghost"
              color="danger"
              className="w-1/2 mt-4 font-medium max-h-11"
            >
              Cancel
            </Button>

            <Button
              isLoading={isLoading}
              size="lg"
              radius="sm"
              color="primary"
              type="submit"
              className="w-1/2 mt-4 font-medium max-h-11"
            >
              {btnText || "Submit"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
