import React from "react";
import { createCartItem } from "@/lib/sdk/methods";

export const MainContext = React.createContext({});

export default function MainContextProvider({ children }: { children: React.ReactNode }) {
  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
}
