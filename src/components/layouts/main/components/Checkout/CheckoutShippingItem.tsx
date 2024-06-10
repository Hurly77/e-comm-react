import { UserShippingAddress } from "@/lib/sdk/models/UserShippingAddress";

export default function CheckoutShippingItem({
  showPhone,
  shipping,
}: {
  shipping: UserShippingAddress;
  showPhone?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p>
          {shipping.first_name}&nbsp;{shipping.last_name}
        </p>
        <p>{shipping.line1}</p>
        <p>{shipping.line2}</p>
        <p>
          {shipping.city}, {shipping.state} {shipping.postal_code}
        </p>
        {showPhone && <p>{shipping.phone_number}</p>}
      </div>
    </div>
  );
}
