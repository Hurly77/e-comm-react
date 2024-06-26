import { Roboto_Flex } from "next/font/google";

const Roboto = Roboto_Flex({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin-ext"],
  variable: "--font-sans",
});

import React from "react";

import { cls } from "../helpers/twind-helpers";

export type AppContextProviderT = {
  children?: React.ReactNode;
};

export type AppContextT = {
  changeTheme: (theme: string) => void;
  theme: string;
  setLoading: (isLoading?: boolean) => void;
  appLoading: boolean;
};

export const AppContext = React.createContext({} as AppContextT);

export default function AppContextProvider({ children }: AppContextProviderT) {
  const [theme, setTheme] = React.useState("light");
  const [appLoading, setAppLoading] = React.useState(false);

  const LOADING_TIMEOUT_MS = 10000; // 10 seconds
  // function to control the loading state of the auth context
  function setLoading(isLoading = true) {
    setAppLoading(isLoading);

    // only when setting the loading state to true.
    if (isLoading) {
      // incase an error occurs, we don't want to keep the loading state forever
      setTimeout(() => setAppLoading(false), LOADING_TIMEOUT_MS);
    }
  }

  function changeTheme(theme: string) {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }

  React.useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setTheme(localStorage.getItem("theme") || "light");
    }
  }, []);

  const value: AppContextT = {
    theme,
    changeTheme,
    setLoading,
    appLoading,
  };

  return (
    <AppContext.Provider value={value}>
      <div className={cls(theme, "app", Roboto.className)}>{children}</div>
    </AppContext.Provider>
  );
}
