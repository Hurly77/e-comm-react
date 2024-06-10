import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
import { Button, Checkbox } from "@nextui-org/react";
import { DefaultValuesOption } from "@stripe/stripe-js";

export interface StripeAddressT {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  btnText?: string;
  defaultValues?: DefaultValuesOption;
  setDefault?: (value: boolean) => void;
}

export default function StripeAddress(props: StripeAddressT) {
  const { onSubmit, onCancel, setDefault, btnText } = props;

  const [isReady, setIsReady] = React.useState(false);

  return (
    <form onSubmit={onSubmit}>
      <AddressElement
        onReady={() => setIsReady(true)}
        options={{
          mode: "billing",
          fields: { phone: "always" },
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
          <Checkbox onValueChange={setDefault} className="my-1" name="saveAddress">
            set as default address
          </Checkbox>
          <div className="flex items-center gap-4">
            <Button
              onPress={onCancel}
              size="lg"
              radius="sm"
              variant="ghost"
              color="danger"
              className="w-1/2 mt-4 font-medium max-h-11"
            >
              Cancel
            </Button>

            <Button size="lg" radius="sm" color="primary" type="submit" className="w-1/2 mt-4 font-medium max-h-11">
              {btnText || "Submit"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
