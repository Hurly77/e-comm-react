import type { ReactElement } from "react";
import AllCategoryDealsPage from "@/layouts/main/pages/Category/AllCategoryDealsPage";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../../_app";

export const AllCategoryDeals: NextPageWithLayout = () => {
  return <AllCategoryDealsPage />;
};

AllCategoryDeals.title = "All Category Deals";
AllCategoryDeals.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AllCategoryDeals;
