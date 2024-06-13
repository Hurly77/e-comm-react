import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import OrdersPage from "@/layouts/main/pages/OrdersPage";
import AccountLayout from "@/layouts/account";

export const Order: NextPageWithLayout = () => {
  return <OrdersPage />;
};

Order.title = "Account: Orders";
Order.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default Order;
