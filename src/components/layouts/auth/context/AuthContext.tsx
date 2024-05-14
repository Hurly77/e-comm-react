import React from "react";

export type AuthContextProviderT = {
  children?: React.ReactNode;
};

export type AuthContextT = { id: string };

export const AuthContext = React.createContext({} as AuthContextT);

// For providing Auth Context to entire application.
// This can be useful for more advanced features such as
// forgot password, password reset, updating user information, etc.
export default function AuthContextProvider({ children }: AuthContextProviderT) {
  // function to control the loading state of the auth context

  const value: AuthContextT = {
    id: "auth-context", // prevents lint error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
