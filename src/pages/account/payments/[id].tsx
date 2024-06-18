import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/components/layouts/main";
import AccountPaymentsEditPage from "@/components/layouts/main/pages/Account/AccountPaymentsEditPage";

export const AccountPayments: NextPageWithLayout = () => {
  return <AccountPaymentsEditPage />;
};

AccountPayments.title = "Account Payments: Edit Payment";
AccountPayments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AccountPayments;
