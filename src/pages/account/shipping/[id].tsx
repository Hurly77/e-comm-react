import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";

import MainLayout from "@/components/layouts/main";

import AccountAddressesEditPage from "@/components/layouts/main/pages/Account/AccountAddressesEditPage";

export const Account: NextPageWithLayout = () => {
  return <AccountAddressesEditPage />;
};

Account.title = "Account Shipping: Edit";
Account.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Account;
