import { useRouter } from "next/router";
import React from "react";
import { auth, AuthLogin, AuthSignup } from "@/lib/sdk/utility/auth";

import { SessionContextT } from "../constants/app.types";
import { AppContext } from "./AppContext";

export const SessionContext = React.createContext({} as SessionContextT);
export default function SessionContextProvider({ children }: SessionContextProviderT) {
  const appCtx = React.useContext(AppContext);
  const router = useRouter();
  // setLoading is a preProcess function that can be access from the Anywhere in the app
  // This allows for a global loading state to be set
  const { setLoading } = appCtx;

  const [isValidating, setIsValidating] = React.useState(true);
  const [sessionChecked, setSessionChecked] = React.useState(false);
  const [session, setSession] = React.useState(null as AuthSession | null);

  async function login(payload: AuthLogin) {
    setLoading(); // default to true
    const { data } = await auth.login(payload);
    if (data) {
      setSession(data?.session);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  }

  async function logout() {
    setLoading(); // default to true
    await auth.logout();
    // eslint-disable-next-line no-console

    setSession(null);
    setLoading(false);
  }

  // function defined here to add layer of pre-processing
  // For Session, not need now but can be added later
  async function signUp(payload: AuthSignup) {
    setLoading(); // default to true
    const { data } = await auth.signUp(payload);

    if (data?.session) setSession(data?.session);
    setLoading(false);
  }

  React.useEffect(() => {
    const checkSession = async () => {
      const authSession = await auth.getSession();
      console.log("AuthSession: ", authSession);
      if (!authSession && session) setSession(null);
      if (authSession && !session) setSession(authSession);

      setSessionChecked(true);
    };

    if (!sessionChecked) checkSession();

    return () => {
      if (sessionChecked) setSessionChecked(false);
    };
  }, [router.pathname, session, sessionChecked]);

  React.useEffect(() => {
    if (sessionChecked && isValidating) setIsValidating(false);
  }, [isValidating, sessionChecked]);

  React.useEffect(() => {
    const isAdminRoute = router.pathname.includes("/admin");
    const acceptedRoutes = ["/auth/admin/login", "/auth/admin/create-account", "/auth/create-account", "/auth/login"];
    const unAuthPathAndNoSession = !isValidating && !session && !acceptedRoutes.includes(router.pathname);
    const loginPathAndSession = !isValidating && session && acceptedRoutes.includes(router.pathname);

    if (unAuthPathAndNoSession && isAdminRoute) router.push("/auth/admin/login");
    if (loginPathAndSession && isAdminRoute) router.push("/admin/dashboard");
    if (loginPathAndSession && acceptedRoutes.includes(router.pathname)) router.push("/");
  }, [isValidating, router, session]);

  console.log("Session isValidating: ", isValidating);

  const value: SessionContextT = {
    login,
    logout,
    signUp,
    session,
  };

  return <SessionContext.Provider value={value}>{isValidating ? <></> : children}</SessionContext.Provider>;
}
