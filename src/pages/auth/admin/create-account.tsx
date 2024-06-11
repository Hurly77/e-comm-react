import type { ReactElement } from "react";

import CreateAccount from "@/components/layouts/auth/pages/CreateAccount";
import AuthLayout from "@/layouts/auth";

import type { NextPageWithLayout } from "../../_app";

export const AuthLogin: NextPageWithLayout = () => {
  return <CreateAccount isAdmin={true} />;
};

AuthLogin.title = "Admin: Create Account";
AuthLogin.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthLogin;
