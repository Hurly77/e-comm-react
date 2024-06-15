import type { ReactElement } from "react";

import MainLayout from "@/layouts/main";

import { NextPageWithLayout } from "../_app";
import CheckoutPage from "@/layouts/main/pages/Checkout/CheckoutPage";
export const Checkout: NextPageWithLayout = () => {
  return <CheckoutPage />;
};

Checkout.title = "Checkout";
Checkout.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Checkout;
