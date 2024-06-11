import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../_app";
import CheckoutStatusPage from "@/components/layouts/main/pages/CheckoutStatusPage";
export const CheckoutStatus: NextPageWithLayout = () => {
  return <CheckoutStatusPage />;
};

CheckoutStatus.title = "Checkout Status";
CheckoutStatus.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CheckoutStatus;
