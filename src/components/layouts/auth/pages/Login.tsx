import React from "react";

import AuthFormWrapper from "../components/AuthFormWrapper";
import LoginForm from "../components/LoginForm";

// used for both admin and Customer
export default function Login({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <AuthFormWrapper title={isAdmin ? "Admin Login" : "Login"} subTitle="Login">
        <LoginForm isAdmin={isAdmin} />
      </AuthFormWrapper>
    </>
  );
}
