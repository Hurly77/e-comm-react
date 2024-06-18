import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner } from "@nextui-org/react";
import EShopBreadcrumbs from "../../components/Shared/EShopBreadcrumbs";
import { ACCOUNT_BREAD_CRUMBS } from "../../constants/nav";
import useSession from "@/app/hooks/useSession";
import React from "react";
import Joi from "joi";
import { phoneParser } from "@/components/layouts/app/helpers/form-helpers";
import { updateUserInformation } from "@/sdk/methods";
import { useRouter } from "next/router";

const userUpdateSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .message("Must be Valid Email Ex: example@gmail.com")
    .required(),
  phone_number: Joi.string()
    .regex(/\(\d{3}\)\s\d{3}-\d{4}/)
    .message("Phone number is required")
    .required(),
});

// TODO: Update the way session is stored.

// This form is really buggy because, user session is stored in localstorage.
// Might Then Fetch the relative user data on page load.
export default function AccountAboutMePage() {
  const { session, updateUser } = useSession();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [requestErrors, setRequestErrors] = React.useState<Record<string, string>>({});
  const [clientErrors, setClientErrors] = React.useState<Record<string, string>>({});
  const [userData, setUserData] = React.useState({
    first_name: session?.user?.first_name ?? "",
    last_name: session?.user?.last_name ?? "",
    email: session?.user?.email ?? "",
    phone_number: session?.user?.phone_number ?? "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setClientErrors({
      ...clientErrors,
      [name]: "",
    });

    setRequestErrors({
      ...requestErrors,
      [name]: "",
    });

    if (name == "phone_number") {
      setUserData((prev) => ({ ...prev, [name]: phoneParser(value) }));
    } else {
      setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user.id) return;
    try {
      setIsUpdating(true);
      const { error } = userUpdateSchema.validate(userData);
      const newInvalids = {} as Record<string, string>;

      if (error) {
        error.details.forEach(({ context, ...details }) => {
          if (context?.key) newInvalids[context.key] = details.message?.replace("_", " ");
        });
      }

      setClientErrors(newInvalids);
      if (error) return;

      const { data, error: requestError } = await updateUserInformation(session?.user.id, userData);
      if (requestError) {
        const { message } = requestError as { message: string | string[] };
        const errorKeys = Object.keys(userData);
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
      }

      if (data) {
        await updateUser(userData);
        router.back();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  if (!session?.user) return <Spinner size="lg" />;

  return (
    <div className="w-full max-w-screen-xl space-y-4 p-8">
      <EShopBreadcrumbs breadcrumbs={ACCOUNT_BREAD_CRUMBS["about"]} />
      {/* eslint-disable-next-line no-console */}
      <form onSubmit={handleOnSubmit}>
        <Card className="max-w-sm">
          <CardHeader>
            <div className="flex justify-between items-end">
              <h1 className="text-2xl font-medium">About Me</h1>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              onChange={handleOnChange}
              value={userData.first_name}
              name="first_name"
              radius="sm"
              variant="bordered"
              type="text"
              placeholder="First Name"
              label="First Name"
              isInvalid={!!clientErrors.first_name ?? requestErrors.first_name}
              errorMessage={clientErrors.first_name ?? requestErrors.first_name}
            />
            <Input
              onChange={handleOnChange}
              value={userData.last_name}
              name="last_name"
              radius="sm"
              variant="bordered"
              type="text"
              placeholder="Last Name"
              label="Last Name"
              isInvalid={!!clientErrors.last_name ?? requestErrors.last_name}
              errorMessage={clientErrors.last_name ?? requestErrors.last_name}
            />
            <Input
              onChange={handleOnChange}
              value={userData.email}
              name="email"
              radius="sm"
              variant="bordered"
              type="email"
              placeholder="Email"
              label="Email"
              isInvalid={!!clientErrors.email || requestErrors.email ? true : undefined}
              errorMessage={clientErrors.email ?? requestErrors.email}
            />
            <Input
              onChange={handleOnChange}
              value={userData.phone_number}
              name="phone_number"
              radius="sm"
              variant="bordered"
              type="text"
              placeholder="Phone"
              label="Phone Number"
              maxLength={14}
              isInvalid={clientErrors.phone_number || requestErrors.phone_number ? true : undefined}
              errorMessage={clientErrors.phone_number || requestErrors.phone_number}
            />
          </CardBody>

          <CardFooter>
            <div className="flex justify-between w-full gap-4">
              <Button
                onClick={() => router.back()}
                isDisabled={isUpdating}
                color="danger"
                variant="ghost"
                radius="sm"
                className="font-medium w-1/2"
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isUpdating} color="primary" radius="sm" className="font-medium w-1/2">
                Save Changes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
