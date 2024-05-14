import React from "react";

export const AdminContext = React.createContext({});

export function AdminContextProvider({ children }: { children: React.ReactNode }) {
  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
}
