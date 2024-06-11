import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../../_app";
import OrdersPage from "@/components/layouts/main/pages/OrdersPage";

export const Order: NextPageWithLayout = () => {
  return <OrdersPage />;
};

Order.title = "Account: Orders";
Order.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Order;
