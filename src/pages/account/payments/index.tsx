import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/components/layouts/main";
import AccountPaymentsPage from "@/layouts/main/pages/Account/AccountPaymentsPage";

export const AccountPayments: NextPageWithLayout = () => {
  return <AccountPaymentsPage />;
};

AccountPayments.title = "Account Payments: Home";
AccountPayments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AccountPayments;
