import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import ErrorBoundary from "./components/ErrorBoundary";
import { HEAD_TITLES } from "./constants/head-titles";
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
              {/* The following will display Title in the Google Tab */}
              {/* It is also used for Google Analytics to know what routes people are visiting */}
              <meta name="description" content={HEAD_TITLES[router.pathname]?.description} />
              <title>{HEAD_TITLES[router.pathname]?.title}</title>
            </Head>
            {children}
          </SessionContextProvider>
        </AppContextProvider>
      </NextUIProvider>
    </ErrorBoundary>
  );
}
