import type { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layouts/main";

export const AccountPayments: NextPageWithLayout = () => {
  return <></>;
};

AccountPayments.title = "AccountPayments: Payments";
AccountPayments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AccountPayments;
