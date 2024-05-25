import React from "react";

type AuthFormWrapperProps = {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
};
export default function AuthFormWrapper({ children, title }: AuthFormWrapperProps) {
  return (
    <div className="flex-col items-center justify-center border-red-500  page border-4 h-screen bg-background grow flex relative">
      <div className="flex flex-col items-center grow text-primary w-full justify-center">
        <div className="flex flex-col justify-center w-full px-2 pt-4 pb-2 space-y-4 max-w-sm">
          {title && <h1 className="w-full text-center text-3xl">{title}</h1>}
          {children}
        </div>
      </div>
    </div>
  );
}
