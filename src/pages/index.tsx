import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "./_app";
import HomePage from "@/components/layouts/main/pages/HomePage";
export const Home: NextPageWithLayout = () => {
  return <HomePage />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
