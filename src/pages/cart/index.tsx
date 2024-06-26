import type { ReactElement } from "react";

import MainLayout from "@/layouts/main";
import { NextPageWithLayout } from "../_app";
import CartPage from "@/layouts/main/pages/Cart/CartPage";

export const Cart: NextPageWithLayout = () => {
  return <CartPage />;
};

Cart.title = "Cart";
Cart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Cart;
