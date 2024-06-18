import { Spinner } from "@nextui-org/react";
import OrderList from "@/layouts/main/components/Order/OrderList";
import EShopBreadcrumbs from "../../components/Shared/EShopBreadcrumbs";
import { ACCOUNT_BREAD_CRUMBS } from "../../constants/nav";
import { useAccount } from "../../hooks/useAccount";

export default function OrdersPage() {
  const { data, isLoading } = useAccount();

  return (
    <div className="sm:p-6 p-4 w-full items-center flex flex-col">
      <div className="max-w-screen-lg w-full space-y-4">
        <EShopBreadcrumbs breadcrumbs={ACCOUNT_BREAD_CRUMBS["orders"]} />

        {isLoading ? <Spinner /> : data ? <OrderList orders={data?.orders ?? []} /> : "No orders"}
      </div>
    </div>
  );
}
