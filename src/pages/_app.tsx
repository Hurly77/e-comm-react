/* eslint-disable @next/next/inline-script-id */
import "../styles/globals.css";

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
        <title>{Component.title}</title>
      </Head>
      <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
    </>
  );
}
