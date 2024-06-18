import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import React from "react";

// this allows me to pas additional props to the component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AccountAddNewModal<F extends React.ComponentType<any>>(props: {
  Component: F;
  componentProps: Omit<React.ComponentProps<F>, "onClose">; // omits the already required onClose props
}) {
  const { Component, componentProps } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "");

  const combinedProps = { ...componentProps, onClose } as React.ComponentProps<F>;

  return (
    <>
      <Button onClick={onOpen} color="primary" radius="sm" className="flex items-center gap-2 font-medium">
        <PlusCircleIcon className="w-6 h-6" />
        Add New Payment
      </Button>

      <Modal radius="sm" motionProps={{}} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="overflow-y-auto custom-scrollbar">
          <ModalHeader>Add Payment Method</ModalHeader>
          <ModalBody className="p-0">
            <div className="pb-4 px-6 overflow-y-auto max-h-[79vh] overflow-x-hidden custom-scrollbar">
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "setup",
                  currency: "usd",
                }}
              >
                <Component {...combinedProps} />
              </Elements>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
