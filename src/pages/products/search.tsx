import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../_app";
import ProductSearchPage from "@/components/layouts/main/pages/ProductSearchPage";

export const ProductSearch: NextPageWithLayout = () => {
  return <ProductSearchPage />;
};

ProductSearch.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProductSearch;
