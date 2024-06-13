import type { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import AccountLayout from "@/layouts/account";
import AccountHomepage from "@/layouts/account/pages/AccountHomepage";

export const Account: NextPageWithLayout = () => {
  return <AccountHomepage />;
};

Account.title = "Account: Home";
Account.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default Account;
