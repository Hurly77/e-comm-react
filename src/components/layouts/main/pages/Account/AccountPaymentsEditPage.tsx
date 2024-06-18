import { useRouter } from "next/router";
import EShopBreadcrumbs from "../../components/Shared/EShopBreadcrumbs";
import { ACCOUNT_BREAD_CRUMBS } from "../../constants/nav";
import { useAccount } from "../../hooks/useAccount";
import AccountEditPaymentsForm from "../../components/Account/AccountEditPaymentsForm";

export default function AccountPaymentsEditPage() {
  const router = useRouter();
  const { data } = useAccount();

  const pmID = router.query.id as string;

  const { paymentsMethods } = data?.payments ?? {};

  const paymentMethod = paymentsMethods?.find((pm) => pm.id === pmID);

  return (
    <div className="w-full max-w-screen-xl space-y-4 p-8">
      <EShopBreadcrumbs breadcrumbs={ACCOUNT_BREAD_CRUMBS["paymentEdit"]} />
      <h1 className="text-2xl font-medium">Edit Payment</h1>

      {paymentMethod && <AccountEditPaymentsForm paymentMethod={paymentMethod} />}
    </div>
  );
}
