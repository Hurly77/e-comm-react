import Joi from "joi";

import { AuthSignup } from "@/lib/sdk/utility/auth";
const signupBaseSchema = {
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  phone_number: Joi.string().required(),
};

export const passwordSignupSchema = Joi.object<AuthSignup>({
  ...signupBaseSchema,
  password: Joi.string().required(),
});

export const googleSignup = Joi.object<AuthSignup>({
  ...signupBaseSchema,
});
