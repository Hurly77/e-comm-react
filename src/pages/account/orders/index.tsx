import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import AccountOrdersPage from "@/layouts/main/pages/Account/AccountOrdersPage";
import MainLayout from "@/components/layouts/main";

export const AccountOrders: NextPageWithLayout = () => {
  return <AccountOrdersPage />;
};

AccountOrders.title = "Account: Orders";
AccountOrders.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AccountOrders;
