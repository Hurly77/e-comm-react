import Joi from "joi";

import { CreateAccountPayload } from "@/lib/sdk/methods/create-customer-account";
const signupBaseSchema = {
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
};

export const passwordSignupSchema = Joi.object<CreateAccountPayload>({
  ...signupBaseSchema,
  password: Joi.string().required(),
});

export const googleSignup = Joi.object<CreateAccountPayload>({
  ...signupBaseSchema,
});
