/* eslint-disable @next/next/inline-script-id */
import "../styles/globals.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

import React from "react";

import AppLayout from "@/app/index";
import Head from "next/head";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  title?: string;
  description?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
        <title>{Component.title}</title>
      </Head>

      <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER ?? ""} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ""} />
    </>
  );
}
