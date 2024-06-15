import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import OrdersPage from "@/layouts/main/pages/OrdersPage";
import MainLayout from "@/components/layouts/main";

export const Order: NextPageWithLayout = () => {
  return <OrdersPage />;
};

Order.title = "Account: Orders";
Order.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Order;
