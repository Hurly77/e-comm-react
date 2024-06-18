import { Elements } from "@stripe/react-stripe-js";
import AccountEditAddressForm from "../../components/Account/AccountEditAddressForm";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAddressById } from "@/lib/sdk/methods";
import { loadStripe } from "@stripe/stripe-js";
import useSession from "@/components/layouts/app/hooks/useSession";
import EShopBreadcrumbs from "../../components/Shared/EShopBreadcrumbs";
import { ACCOUNT_BREAD_CRUMBS } from "../../constants/nav";

export default function AccountAddressesEditPage() {
  const router = useRouter();
  const { session } = useSession();

  const addressID = parseInt(router.query?.id?.toString() ?? "0");
  const userID = session?.user?.id;

  const fetcher = () => (addressID && userID ? getAddressById(addressID, userID) : null);
  const { data, isLoading } = useSWR(`address_${addressID}`, fetcher);

  return (
    <div className="w-full max-w-screen-xl space-y-4 p-8">
      <EShopBreadcrumbs breadcrumbs={ACCOUNT_BREAD_CRUMBS["addressEdit"]} />
      <h1 className="text-2xl font-medium">Edit Address</h1>

      {!isLoading && data ? (
        <Elements
          stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "")}
          options={{ mode: "setup", currency: "usd" }}
        >
          <AccountEditAddressForm userId={userID ?? 0} address={data} />
        </Elements>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
