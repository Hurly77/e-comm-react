import type { ReactElement } from "react";
import AllCategories from "@/layouts/main/pages/AllCategories";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../_app";

export const AllCategoriesPage: NextPageWithLayout = () => {
  return <AllCategories />;
};

AllCategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AllCategoriesPage;