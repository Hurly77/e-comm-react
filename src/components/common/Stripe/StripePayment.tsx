import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";

export interface StripePaymentT {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  btnText?: string;
}

export default function StripePayment({ onSubmit, onCancel, btnText }: StripePaymentT) {
  const [isReady, setIsReady] = React.useState(false);

  return (
    <form className="space-y-4 grow" onSubmit={onSubmit}>
      <PaymentElement
        options={{
          layout: {
            type: "tabs",
            radios: true,
          },
        }}
        onReady={() => setIsReady(true)}
      />
      {isReady && (
        <div className="flex items-center gap-4">
          <Button
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
            type="submit"
            size="lg"
            className="w-full font-medium text-medium max-h-11"
            radius="sm"
            color="primary"
          >
            {btnText || "Pay"}
          </Button>
        </div>
      )}
    </form>
  );
}
