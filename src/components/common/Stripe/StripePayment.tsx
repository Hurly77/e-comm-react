import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button, Checkbox } from "@nextui-org/react";
import { StripeElementProps } from "./types";

export interface StripePaymentT extends StripeElementProps {}

export default function StripePayment({
  onSubmit,
  setToDefault,
  onCancel,
  children,
  btnText,
  isLoading,
}: StripePaymentT) {
  const [isReady, setIsReady] = React.useState(false);

  return (
    <form className="space-y-4 grow" onSubmit={onSubmit}>
      <div className="sticky top-0 z-10 bg-background">
        <PaymentElement
          options={{
            fields: {
              billingDetails: {
                address: "never",
              },
            },
            layout: {
              type: "tabs",
              radios: true,
            },
          }}
          onReady={() => setIsReady(true)}
        />
      </div>
      {isReady && (
        <>
          {children && <div>{children}</div>}
          <Checkbox onValueChange={setToDefault}>set as default</Checkbox>
          <div className="flex items-center gap-4">
            <Button
              isDisabled={isLoading}
              variant="ghost"
              type="submit"
              size="lg"
              className="w-full font-medium text-medium max-h-11"
              radius="sm"
              color="danger"
              onPress={() => onCancel?.()}
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              spinnerPlacement="end"
              type="submit"
              size="lg"
              className="w-full font-medium text-medium max-h-11"
              radius="sm"
              color="primary"
            >
              {btnText || "Pay"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
