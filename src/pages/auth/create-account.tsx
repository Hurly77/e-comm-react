import type { ReactElement } from "react";

import CreateAccount from "@/components/layouts/auth/pages/CreateAccount";
import AuthLayout from "@/layouts/auth";

import type { NextPageWithLayout } from "../_app";

export const AuthLogin: NextPageWithLayout = () => {
  return <CreateAccount isAdmin={false} />;
};

AuthLogin.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthLogin;
