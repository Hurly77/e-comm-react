import type { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layouts/main";
import AccountAboutMePage from "@/layouts/main/pages/Account/AccountAboutMePage";

export const AccountAboutMe: NextPageWithLayout = () => {
  return <AccountAboutMePage />;
};

AccountAboutMe.title = "Account: About Me";
AccountAboutMe.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AccountAboutMe;
