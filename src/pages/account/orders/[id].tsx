import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import AccountOrdersDetailPage from "@/layouts/main/pages/Account/AccountOrdersDetailPage";
import MainLayout from "@/components/layouts/main";

export const AccountOrder: NextPageWithLayout = () => {
  const router = useRouter();

  const AccountOrderId = router.query.id ? Number(router.query.id) : undefined;
  return <AccountOrdersDetailPage id={AccountOrderId} />;
};

AccountOrder.title = "Account: Order Details";
AccountOrder.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AccountOrder;
