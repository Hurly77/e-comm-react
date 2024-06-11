import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import SingleOrderPage from "@/components/layouts/main/pages/SingleOrderPage";

export const OrderItem: NextPageWithLayout = () => {
  const router = useRouter();

  const OrderItemId = router.query.id ? Number(router.query.id) : undefined;
  return <SingleOrderPage id={OrderItemId} />;
};

OrderItem.title = "Account: Order Details";
OrderItem.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default OrderItem;
