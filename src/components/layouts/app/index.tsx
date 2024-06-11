import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import ErrorBoundary from "./components/ErrorBoundary";
import AppContextProvider from "./context/AppContext";
import SessionContextProvider from "./context/SessionContext";

export default function AppLayout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();

  return (
    <ErrorBoundary fallback={<></>}>
      <NextUIProvider navigate={router.push}>
        <AppContextProvider>
          <SessionContextProvider>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {children}
          </SessionContextProvider>
        </AppContextProvider>
      </NextUIProvider>
    </ErrorBoundary>
  );
}
