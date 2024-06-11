import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "./_app";

export const FourOFour: NextPageWithLayout = () => {
  return <>Page Not Found</>;
};

FourOFour.title = "E-Shop: 404";
FourOFour.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default FourOFour;
