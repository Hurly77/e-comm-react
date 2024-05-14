import type { ReactElement } from "react";

import { AdminLayout } from "@/layouts/admin/index";

import { NextPageWithLayout } from "../../_app";
import { AdminDashboardPage } from "@/components/layouts/admin/pages/AdminDashboardPage";

export const Dashboard: NextPageWithLayout = () => {
  return <AdminDashboardPage />;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
