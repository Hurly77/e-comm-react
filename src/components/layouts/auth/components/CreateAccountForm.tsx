import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import useSession from "../../app/hooks/useSession";
import { CREATE_ACCOUNT_FORM } from "../constants/Auth.text";
import { AUTH_SIGNUP_ERRORS_VALIDATION_ERRORS } from "../constants/form-errors";
import { passwordSignupSchema } from "../helpers/forms";
import { AuthSignup } from "@/lib/sdk/utility/auth";

export default function CreateAccountForm({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const auth = useSession();
  const [showPassword, setShowPassword] = React.useState(false); // state for toggling hide/show password
  // Credentials for signup with password.
  const [credentials, setCredentials] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    confirm_password: "",
  });

  // Holds the State of the most recent error, i.e if there are more than one error.
  // sets nextError to the errors[0]
  const [nextError, setNextError] = React.useState<string[] | undefined>();
  // uses the name filed of input to set the key: value
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { password, confirm_password, ...payload } = credentials;

    const { error } = passwordSignupSchema.validate({ ...payload, password });
    console.log(error);

    // Joi validation
    if (password !== confirm_password) {
      setNextError(AUTH_SIGNUP_ERRORS_VALIDATION_ERRORS["confirm_password"]);
      setTimeout(() => setNextError(undefined), 3000);
      return;
    } else if (error) {
      const errorKey = error.details[0].context?.key as keyof typeof AUTH_SIGNUP_ERRORS_VALIDATION_ERRORS;
      setNextError(AUTH_SIGNUP_ERRORS_VALIDATION_ERRORS[errorKey]);
      setTimeout(() => setNextError(undefined), 3000);
      return;
    }

    const signupPayload: AuthSignup = {
      email: credentials.email,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      password,
      phone_number: credentials.phone_number,
      role: isAdmin ? "admin" : "customer",
    };

    if (isAdmin) {
      auth.signUp(signupPayload);
    } else {
      auth.signUp(signupPayload);
    }
  }

  // Renders the Eye Icon when state changes.
  const ShowingPasswordIcon = showPassword ? (
    <EyeSlashIcon className="h-5 w-5 text-primary cursor-pointer" onClick={() => setShowPassword(false)} />
  ) : (
    <EyeIcon className="h-5 w-5 text-primary cursor-pointer" onClick={() => setShowPassword(true)} />
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="min-h-[2rem]">
        {nextError &&
          nextError.map((msg) => (
            <p key={msg} className="text-xl text-red-500">
              {msg}
            </p>
          ))}
      </div>
      <div className="space-y-4 pb-4">
        <div className="flex gap-x-2 pt-2">
          <Input
            name="first_name"
            required
            onChange={onChangeHandler}
            label={CREATE_ACCOUNT_FORM.INPUTS.FIRST_NAME.LABEL}
            placeholder={CREATE_ACCOUNT_FORM.INPUTS.FIRST_NAME.PLACEHOLDER}
          />
          <Input
            name="last_name"
            required
            onChange={onChangeHandler}
            label={CREATE_ACCOUNT_FORM.INPUTS.LAST_NAME.LABEL}
            placeholder={CREATE_ACCOUNT_FORM.INPUTS.LAST_NAME.PLACEHOLDER}
          />
        </div>

        <Input
          name="email"
          required
          onChange={onChangeHandler}
          label={CREATE_ACCOUNT_FORM.INPUTS.EMAIL.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.EMAIL.PLACEHOLDER}
        />

        <Input
          name="password"
          required
          onChange={onChangeHandler}
          type={showPassword ? "text" : "password"}
          label={CREATE_ACCOUNT_FORM.INPUTS.PASSWORD.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.PASSWORD.PLACEHOLDER}
          endContent={ShowingPasswordIcon}
        />
        <Input
          name="confirm_password"
          required
          onChange={onChangeHandler}
          type={showPassword ? "text" : "password"}
          label={CREATE_ACCOUNT_FORM.INPUTS.CONFIRM_PASSWORD.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.CONFIRM_PASSWORD.PLACEHOLDER}
        />

        <Input
          name="phone_number"
          required
          onChange={onChangeHandler}
          label={CREATE_ACCOUNT_FORM.INPUTS.PHONE_NUMBER.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.PHONE_NUMBER.PLACEHOLDER}
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={() => router.back()}>Back</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
