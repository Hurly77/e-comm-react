import { useRouter } from "next/router";

import useSession from "@/app/hooks/useSession";
import { formatDate } from "@/layouts/main/helpers/date";
import React from "react";
import PaymentMethodCard from "@/layouts/main/components/Shared/PaymentMethodCard";
import { HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import { getAccountInfo } from "@/lib/sdk/fetchers/account-info-fetcher";
import useSWR from "swr";
import AddressDisplay from "@/layouts/main/components/Shared/AddressDisplay";
import AccountCard from "@/layouts/main/components/Account/AccountCard";
import AccountPurchaseHistory from "@/layouts/main/components/Account/AccountPurchaseHistory";
import AccountSkeleton from "@/layouts/main/components/Account/AccountSkeleton";

export default function AccountPage() {
  const { session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const { data, isLoading } = useSWR(`account-info-${user?.id}`, () => getAccountInfo(user?.id));
  const { defaultPM, orders, shippingAddress } = data ?? {};

  const defaultAddress = shippingAddress?.[0];

  if (!user) router.push("/");
  if (isLoading) return <AccountSkeleton />;
  return (
    <div className="w-full max-w-screen-xl space-y-4 bg-default-100">
      <div className="flex items-center h-40 flex-col justify-center">
        <h1 className="text-3xl font-semibold capitalize">Hello, {user?.first_name}</h1>
        <span>Account since {formatDate(user?.created_at ?? new Date())}</span>
      </div>
      <AccountPurchaseHistory orders={orders ?? []} />
      <div className="grid grid-cols-2 gap-4">
        <AccountCard link={"/account/payments"} title="Payments">
          {defaultPM ? <PaymentMethodCard card={defaultPM} /> : <h1>No payment methods</h1>}
        </AccountCard>
        <AccountCard title="Addresses" link={"/account/shipping"}>
          <div className="flex  items-center gap-2">
            <HomeIcon className="h-10 w-10 text-primary" />
            {defaultAddress ? (
              <AddressDisplay boldedName format="city-state" address={defaultAddress} />
            ) : (
              <h1>No shipping address</h1>
            )}
          </div>
        </AccountCard>

        <AccountCard title="Account Details">
          <div className="flex items-center gap-2">
            <UserIcon className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-lg font-medium">{user?.email}</h1>
              <p>Edit your name, contact information, phone, password and more.</p>
            </div>
          </div>
        </AccountCard>
      </div>
    </div>
  );
}
