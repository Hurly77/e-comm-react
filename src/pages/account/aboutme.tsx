import type { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layouts/main";
import AccountPage from "@/components/layouts/main/pages/Account/AccountPage";

export const Account: NextPageWithLayout = () => {
  return <AccountPage />;
};

Account.title = "Account: Home";
Account.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Account;
