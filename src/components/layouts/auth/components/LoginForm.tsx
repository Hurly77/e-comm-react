import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import useSession from "../../app/hooks/useSession";
import { LOGIN_FORM } from "../constants/Auth.text";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginForm({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const auth = useSession();

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let isLogin = false;
    if (isAdmin) {
      isLogin = await auth.admin.login({ ...credentials, role: isAdmin ? "admin" : "customer" });
    } else {
      isLogin = await auth.login({ ...credentials, role: isAdmin ? "admin" : "customer" });
    }

    if (!isLogin) {
      setError("Email or Password is incorrect. Please try again.");
      setTimeout(() => setError(undefined), 3000);
    }
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="flex flex-col space-y-3 w-full" onSubmit={onSubmit}>
      <div>{error && <span className="text-danger">{error}</span>}</div>
      <div className="px-4 space-y-4 py-4">
        <Input
          type="text"
          name="email"
          onChange={onChangeHandler}
          value={credentials?.email}
          label={LOGIN_FORM.INPUTS.EMAIL.LABEL}
          placeholder={LOGIN_FORM.INPUTS.EMAIL.PLACEHOLDER}
        />
        <Input
          name="password"
          type={passwordVisible ? "text" : "password"}
          onChange={onChangeHandler}
          label={LOGIN_FORM.INPUTS.PASSWORD.LABEL}
          placeholder={LOGIN_FORM.INPUTS.PASSWORD.PLACEHOLDER}
          endContent={
            passwordVisible ? (
              <EyeIcon className="h-5 w-5 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />
            ) : (
              <EyeSlashIcon className="h-5 w-5 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />
            )
          }
        />
      </div>

      <div className="flex justify-between w-full">
        <Button onClick={() => router.push(isAdmin ? "/auth/admin/create-account" : "auth/create-account")}>
          Create New
        </Button>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
