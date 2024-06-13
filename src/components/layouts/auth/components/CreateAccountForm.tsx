import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import useSession from "../../app/hooks/useSession";
import { CREATE_ACCOUNT_FORM } from "../constants/Auth.text";
import { passwordSignupSchema, getPasswordValidations } from "../helpers/forms";
import { AuthSignup } from "@/lib/sdk/utility/auth";
import { phoneParser } from "../../app/helpers/form-helpers";

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

  // holds the errors from the request
  const [requestErrors, setRequestErrors] = React.useState<Record<string, string>>({});
  const [clientErrors, setClientErrors] = React.useState<Record<string, string>>({});
  const [signupInProgress, setSignupInProgress] = React.useState(false);
  // uses the name filed of input to set the key: value
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: name === "phone_number" ? phoneParser(value) : value });
  }

  // Handles the form submission
  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSignupInProgress(true);
      const { password } = credentials;

      const { error, warning, value } = passwordSignupSchema.validate(credentials);
      // eslint-disable-next-line no-console
      console.log(error, warning, value, error?.details);
      const newInvalids = {} as Record<string, string>;
      if (error) {
        error.details.forEach(({ context, ...details }) => {
          if (context?.key) newInvalids[context.key] = details.message;
        });
      }

      setClientErrors(newInvalids);

      const signupPayload: AuthSignup = {
        email: credentials.email,
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        password,
        phone_number: credentials.phone_number,
        role: isAdmin ? "admin" : "customer",
      };

      const { message } = (await auth.signUp(signupPayload)) ?? {};
      const errorKeys = Object.keys(credentials);

      // Not the best way to handle this but
      // the messages come in two formats string or arrray
      // And I wanted them to be displayed on the inputs
      if (message && Array.isArray(message)) {
        const updatedRequestErrors = {} as Record<string, string>;
        message.forEach((error) => {
          const key = errorKeys.find((key) => error.includes(key));
          if (key) updatedRequestErrors[key] = error?.replace("_", " ");
        });

        setRequestErrors(updatedRequestErrors);
      } else if (message) {
        const key = errorKeys.find((key) => message.includes(key));
        setRequestErrors({ [key ?? "message"]: message?.replace("_", " ") });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error signing up", error);
    } finally {
      // prevent the inprogress state from blocking the form
      // if the request fails
      setSignupInProgress(false);
    }
  }

  const passwordAreMatching = credentials.password === credentials.confirm_password;
  const passwordFieldsAreNotEmpty = !!credentials.password && !!credentials.confirm_password;

  const passwordMatchIcon =
    credentials.password === credentials.confirm_password ? (
      <ShieldCheckIcon className="h-6 w-6 stroke-success cursor-pointer" />
    ) : (
      <ShieldExclamationIcon className="h-6 w-6 stroke-danger cursor-pointer" />
    );

  // Renders the Eye Icon when state changes.
  const ShowingPasswordIcon = showPassword ? (
    <EyeSlashIcon className="h-6 w-6 text-primary cursor-pointer" onClick={() => setShowPassword(false)} />
  ) : (
    <EyeIcon className="h-6 w-6 text-primary cursor-pointer" onClick={() => setShowPassword(true)} />
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="space-y-4 pb-4">
        <div className="flex gap-x-2 pt-2">
          <Input
            variant="bordered"
            radius="sm"
            name="first_name"
            required
            onChange={onChangeHandler}
            label={CREATE_ACCOUNT_FORM.INPUTS.FIRST_NAME.LABEL}
            placeholder={CREATE_ACCOUNT_FORM.INPUTS.FIRST_NAME.PLACEHOLDER}
          />
          <Input
            variant="bordered"
            radius="sm"
            name="last_name"
            required
            onChange={onChangeHandler}
            label={CREATE_ACCOUNT_FORM.INPUTS.LAST_NAME.LABEL}
            placeholder={CREATE_ACCOUNT_FORM.INPUTS.LAST_NAME.PLACEHOLDER}
          />
        </div>

        <Input
          required
          radius="sm"
          name="email"
          variant="bordered"
          isInvalid={clientErrors?.email || requestErrors?.email ? true : undefined}
          errorMessage={clientErrors?.email || requestErrors?.email}
          onChange={onChangeHandler}
          label={CREATE_ACCOUNT_FORM.INPUTS.EMAIL.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.EMAIL.PLACEHOLDER}
        />

        <Input
          required
          radius="sm"
          name="password"
          id="password"
          variant="bordered"
          onChange={onChangeHandler}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          isInvalid={clientErrors?.password ? true : undefined}
          errorMessage={
            <ul>
              {getPasswordValidations(credentials.password).map(({ message, isValid, list }) => (
                <li key={message} className={isValid ? "text-success" : "text-danger"}>
                  <span>{list}</span>
                  <span>{message}</span>
                </li>
              ))}
            </ul>
          }
          value={credentials.password}
          label={CREATE_ACCOUNT_FORM.INPUTS.PASSWORD.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.PASSWORD.PLACEHOLDER}
          endContent={ShowingPasswordIcon}
        />
        <Input
          id="confirm_password"
          required
          radius="sm"
          variant="bordered"
          name="confirm_password"
          autoComplete="new-password"
          onChange={onChangeHandler}
          type={showPassword ? "text" : "password"}
          errorMessage={"Passwords do not match"}
          value={credentials.confirm_password}
          label={CREATE_ACCOUNT_FORM.INPUTS.CONFIRM_PASSWORD.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.CONFIRM_PASSWORD.PLACEHOLDER}
          isInvalid={passwordFieldsAreNotEmpty ? !passwordAreMatching : undefined}
          endContent={credentials.confirm_password && credentials.password ? passwordMatchIcon : undefined}
        />

        <Input
          required
          radius="sm"
          variant="bordered"
          name="phone_number"
          autoComplete="tel-national"
          isInvalid={clientErrors?.phone_number || requestErrors?.phone_number ? true : undefined}
          errorMessage={clientErrors?.phone_number || requestErrors?.phone_number}
          maxLength={14}
          onChange={onChangeHandler}
          value={credentials.phone_number}
          label={CREATE_ACCOUNT_FORM.INPUTS.PHONE_NUMBER.LABEL}
          placeholder={CREATE_ACCOUNT_FORM.INPUTS.PHONE_NUMBER.PLACEHOLDER}
        />
      </div>
      <div className="flex justify-between gap-4">
        <Button
          isDisabled={signupInProgress}
          className="grow"
          radius="sm"
          color="primary"
          variant="ghost"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button isLoading={signupInProgress} className="grow" radius="sm" color="primary" type="submit">
          Sign Up
        </Button>
      </div>
    </form>
  );
}
