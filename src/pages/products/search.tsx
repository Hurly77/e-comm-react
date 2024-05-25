import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../_app";

export const ProductSearch: NextPageWithLayout = () => {
  return <></>;
};

ProductSearch.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProductSearch;
