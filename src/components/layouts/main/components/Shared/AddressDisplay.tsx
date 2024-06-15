import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { UserShippingAddress } from "@/lib/sdk/models/UserShippingAddress";

interface AddressDisplayProps {
  format?: "full" | "city-state" | "line1" | "short";
  withName?: boolean;
  hideName?: boolean;
  address: UserShippingAddress;
  boldedName?: boolean;
}

export default function AddressDisplay({ address, format, boldedName, hideName }: AddressDisplayProps) {
  const { first_name, last_name, line1, city, state, postal_code, country } = address;

  const fullCountry = country == "US" ? "United States" : country;

  return (
    <div>
      {!hideName && (
        <h1 className={cls("text-lg", boldedName ? "font-medium" : "")}>
          {first_name} {last_name}
        </h1>
      )}
      <div className="uppercase">
        {["line1", "full"].includes(format ?? "full") && <p>{line1}</p>}
        {["city-state", "full"].includes(format ?? "full") && (
          <p>
            {city}, {state} {postal_code}
          </p>
        )}
        {format === "full" && <p>{fullCountry}</p>}
      </div>
    </div>
  );
}
