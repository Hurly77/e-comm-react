import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";

export default function StripeAddress() {
  return (
    <AddressElement
      options={{
        mode: "billing",
        fields: { phone: "always" },
        validation: { phone: { required: "always" } },
        display: { name: "split" },
        autocomplete: {
          mode: "google_maps_api",
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
        },
      }}
    />
  );
}
