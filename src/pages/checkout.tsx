import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "./_app";
import CheckoutPage from "@/components/layouts/main/pages/CheckoutPage";
export const Checkout: NextPageWithLayout = () => {
  return <CheckoutPage />;
};

Checkout.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Checkout;
