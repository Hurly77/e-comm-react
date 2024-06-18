import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";

import MainLayout from "@/components/layouts/main";
import AccountAddressesPage from "@/components/layouts/main/pages/Account/AccountAddressesPage";

export const Account: NextPageWithLayout = () => {
  return <AccountAddressesPage />;
};

Account.title = "Account Shipping: Home";
Account.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Account;
