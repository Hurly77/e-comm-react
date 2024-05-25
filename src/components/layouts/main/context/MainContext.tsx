import React from "react";

export const MainContext = React.createContext({});

export default function MainContextProvider({ children }: { children: React.ReactNode }) {
  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
}
