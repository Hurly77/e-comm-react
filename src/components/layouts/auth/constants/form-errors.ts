import type { AuthSignup } from "@/sdk/utility/auth";

type AuthFormErrorData = Record<keyof Omit<AuthSignup, "role"> | "confirm_password", string[]>;

export const AUTH_SIGNUP_ERRORS_VALIDATION_ERRORS: AuthFormErrorData = {
  first_name: [""],
  last_name: [""],
  email: ["Please Enter a valid email address", "EX: example@email.com"],
  password: [""],
  confirm_password: ["Passwords do not match"],
  phone_number: [],
};
