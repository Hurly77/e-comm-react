import type { ReactElement } from "react";

import AuthLayout from "@/layouts/auth";
import Login from "@/layouts/auth/pages/Login";

import type { NextPageWithLayout } from "../../_app";

export const AuthLogin: NextPageWithLayout = () => {
  return <Login isAdmin={true} />;
};

AuthLogin.title = "Admin: Login";
AuthLogin.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthLogin;
