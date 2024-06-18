import { Button, Input } from "@nextui-org/react";
import React from "react";
import Stripe from "stripe";
import { useAccount } from "../../hooks/useAccount";
import AddressDisplay from "../Shared/AddressDisplay";
import { UserShippingAddress } from "@/lib/sdk/models/UserShippingAddress";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import PaymentMethodCard from "../Shared/PaymentMethodCard";
import { updatePaymentMethod } from "@/lib/sdk/methods";
import { useRouter } from "next/router";

export default function AccountEditPaymentsForm({ paymentMethod }: { paymentMethod: Stripe.PaymentMethod }) {
  const router = useRouter();
  const { data } = useAccount();
  const { addresses, defaultAddress } = data?.shipping ?? {};

  const [responseError, setResponseError] = React.useState<string | null>(null);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<UserShippingAddress | null>(null);
  const [expirationDate, setExpirationDate] = React.useState({
    year: paymentMethod?.card?.exp_year ?? new Date().getFullYear(),
    month: paymentMethod?.card?.exp_month ?? new Date().getMonth() + 1,
  });

  React.useEffect(() => {
    const paymentAddressId = parseInt(paymentMethod?.metadata?.shipping_address_id || "0");
    if (selectedAddress === null && paymentAddressId) {
      const paymentAddress = addresses?.find((address) => address?.id === paymentAddressId);
      setSelectedAddress(paymentAddress ? paymentAddress : defaultAddress ? defaultAddress : null);
    } else if (selectedAddress === null && defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, defaultAddress, paymentMethod?.metadata?.shipping_address_id, selectedAddress]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "year") {
      const lengthGT4 = value.length > 4;
      const valueGT2099 = parseInt(value) > 2099;
      if (valueGT2099 || lengthGT4) return;
      setExpirationDate((prev) => ({ ...prev, [name]: parseInt(value) }));
    }
    if (name === "month") {
      const lengthGT2 = value.length > 2;
      const valueGT12 = parseInt(value) > 12;
      if (valueGT12 || lengthGT2) return;
      setExpirationDate((prev) => ({ ...prev, [name]: parseInt(value) }));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsUpdating(true);
      const { error } = await updatePaymentMethod({
        pm_id: paymentMethod.id,
        user_id: data?.userId ?? 0,
        shipping_address_id: selectedAddress?.id,

        card: {
          exp_month: expirationDate.month,
          exp_year: expirationDate.year,
        },
      });
      if (error) throw error;
      router.back();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      const { message } = error as { message: string; statusCode: number };
      setResponseError(message);
      setTimeout(() => setResponseError(null), 5000);
    } finally {
      setIsUpdating(false);
      // do something
    }
  }

  const [currentYear, currentMonth] = [new Date().getFullYear(), new Date().getMonth() + 1];
  const isInvalidMonth = expirationDate.year === currentYear && expirationDate.month < currentMonth;
  const isInvalidYear = expirationDate.year < currentYear;

  return (
    <div className="max-w-lg space-y-4">
      {responseError && <div className="text-red-500">{responseError}</div>}
      <div className="border w-full rounded p-4">
        {paymentMethod.card && <PaymentMethodCard size="lg" align="start" showExpiration card={paymentMethod.card} />}
      </div>
      <form className="space-y-2" onSubmit={onSubmit}>
        <Input
          radius="sm"
          name="year"
          label="Year"
          variant="bordered"
          type="number"
          max={2099}
          maxLength={4}
          onChange={handleOnChange}
          isInvalid={isInvalidYear}
          errorMessage={`Expiration year must be >= ${currentYear}`}
          min={new Date().getFullYear()}
          value={expirationDate.year?.toString()}
        />
        <Input
          radius="sm"
          name="month"
          label="Month"
          type="number"
          variant="bordered"
          min={1}
          max={12}
          maxLength={2}
          onChange={handleOnChange}
          isInvalid={isInvalidMonth}
          errorMessage={"Expiration month is in the past"}
          value={expirationDate.month?.toString() ?? ""}
        />

        <div>
          <div className="flex flex-col max-h-96 gap-4 p-4 overflow-y-auto custom-scrollbar">
            {addresses &&
              addresses.map((address) => (
                <div
                  className={cls(
                    "border-2 rounded p-2 shadow-small cursor-pointer",
                    address?.id === selectedAddress?.id ? "border-primary border-2" : "border-transparent"
                  )}
                  onClick={() => setSelectedAddress(address)}
                  key={address.id}
                >
                  <AddressDisplay boldedName address={address} />
                </div>
              ))}
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            radius="sm"
            color="danger"
            variant="ghost"
            className="w-1/2"
            isDisabled={isUpdating}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button isLoading={isUpdating} color="primary" className="w-1/2" type="submit" radius="sm">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
