import Joi from "joi";

import { AuthSignup } from "@/lib/sdk/utility/auth";
const signupBaseSchema = {
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .message("Must be Valid Email Ex: example@gmail.com")
    .required(),

  password: Joi.string()
    .regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)
    .message(
      `Password must be:
      • At least 8 characters
      • At least one uppercase letter
      • At least one lowercase letter
      • At least one number
      • At least one special character @#$%^&+=
      • No spaces`
    )
    .required(),
  confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  phone_number: Joi.string()
    .regex(/\(\d{3}\)\s\d{3}-\d{4}/)
    .message("Phone number must be 10 digits")
    .required(),
};

export const passwordSignupSchema = Joi.object<Omit<AuthSignup, "role"> & { confirm_password: string }>(
  signupBaseSchema
);

export function getPasswordValidations(password: string) {
  const criteria = [
    { message: "At least 8 characters", regex: /.{8,}/ },
    { message: "At least one uppercase letter", regex: /[A-Z]/ },
    { message: "At least one lowercase letter", regex: /[a-z]/ },
    { message: "At least one number", regex: /[0-9]/ },
    { message: "At least one special character @#$%^&+=", regex: /[@#$%^&+=]/ },
    { message: "No spaces", regex: /^\S*$/ },
  ];

  return criteria.map((criterion) => ({
    message: criterion.message,
    isValid: criterion.regex.test(password),
    list: criterion.regex.test(password) ? "✓" : "✗",
  }));
}
