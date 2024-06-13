import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/router";

type AuthFormWrapperProps = {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
};
export default function AuthFormWrapper({ children, title }: AuthFormWrapperProps) {
  const pathname = useRouter().pathname;
  const loginTitles = {
    title: "Welcome back",
    subTitle: "Login to your account to continue",
  };

  const signUpTitles = {
    title: "Welcome",
    subTitle: "Welcome create your account to get started",
  };

  const currentTitles = pathname.includes("login") ? loginTitles : signUpTitles;
  return (
    <div className="flex-col items-center justify-center page h-screen bg-background grow flex relative">
      <div className="flex flex-col items-center grow text-primary w-full justify-center">
        <div className="w-12 h-12 sm:w-24 sm:h-24">
          <Image src="/images/logo.png" className="rounded-full shadow-none" width="100" height="100" alt="logo" />
        </div>
        <div className="text-center sm:py-4">
          <h2 className="font-medium text-foreground text-xl">{currentTitles.title}</h2>
          <sub className="text-foreground-400 text-sm">{currentTitles.subTitle}</sub>
        </div>
        <div className="flex flex-col justify-center w-full sm:px-2 pt-4 sm:pb-2 space-y-4 sm:max-w-sm">
          <Card className="sm:p-4">
            <CardHeader>{title && <h1 className="w-full text-2xl">{title}</h1>}</CardHeader>
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
