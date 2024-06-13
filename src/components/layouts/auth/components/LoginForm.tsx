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
    const isLogin = await auth.login({ ...credentials, role: isAdmin ? "admin" : "customer" });

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
    <form className="flex flex-col space-y-3 w-full pb-4" onSubmit={onSubmit}>
      <div>{error && <span className="text-danger text-sm">{error}</span>}</div>
      <div className="space-y-4">
        <Input
          type="text"
          name="email"
          radius="sm"
          variant="bordered"
          onChange={onChangeHandler}
          value={credentials?.email}
          label={LOGIN_FORM.INPUTS.EMAIL.LABEL}
          placeholder={LOGIN_FORM.INPUTS.EMAIL.PLACEHOLDER}
        />
        <Input
          name="password"
          radius="sm"
          variant="bordered"
          type={passwordVisible ? "text" : "password"}
          onChange={onChangeHandler}
          label={LOGIN_FORM.INPUTS.PASSWORD.LABEL}
          placeholder={LOGIN_FORM.INPUTS.PASSWORD.PLACEHOLDER}
          endContent={
            passwordVisible ? (
              <EyeIcon
                className="h-6 w-6 cursor-pointer stroke-primary"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            ) : (
              <EyeSlashIcon
                className="h-6 w-6 stroke-primary cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            )
          }
        />
      </div>

      <div className="flex justify-between w-full gap-4">
        <Button
          radius="sm"
          variant="ghost"
          color="primary"
          className="w-full"
          onClick={() => router.push(isAdmin ? "/auth/admin/create-account" : "/auth/create-account")}
        >
          Create New
        </Button>
        <Button radius="sm" color="primary" className="w-full" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
