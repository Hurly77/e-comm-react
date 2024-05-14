import { useRouter } from "next/router";
import React from "react";
import { adminAuth, AuthLogin, AuthSignup, customerAuth } from "@/lib/sdk/utility/auth";

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
  const [adminSession, setAdminSession] = React.useState(null as AuthSession | null);

  async function adminLogin(payload: AuthLogin) {
    setLoading(); // default to true
    const { data } = await adminAuth.login(payload);
    console.log(data);
    if (data?.session) {
      setAdminSession(data?.session);
      return true;
    }
    setLoading(false);

    return false;
  }

  async function adminSignup(payload: AuthSignup) {
    setLoading(); // default to true
    const { data } = await adminAuth.signUp(payload);
    if (data?.session) setAdminSession(data?.session);
    setLoading(false);
  }

  async function adminLogout() {
    setLoading(); // default to true
    await adminAuth.logout();
    setAdminSession(null);
    setLoading(false);
  }

  async function login(payload: AuthLogin) {
    setLoading(); // default to true
    const { data } = await customerAuth.login(payload);
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
    await customerAuth.logout();
    // eslint-disable-next-line no-console

    setSession(null);
    setLoading(false);
  }

  // function defined here to add layer of pre-processing
  // For Session, not need now but can be added later
  async function signUp(payload: AuthSignup) {
    setLoading(); // default to true
    const { data } = await customerAuth.signUp(payload);

    if (data?.session) setSession(data?.session);
    setLoading(false);
  }

  React.useEffect(() => {
    const isAdminRoute = router.pathname.includes("/admin");
    const checkSession = async () => {
      if (isAdminRoute) {
        const authSession = await adminAuth.getSession();
        if (!authSession && adminSession) setAdminSession(null);
        if (authSession && !adminSession) setAdminSession(authSession);
      }
      setSessionChecked(true);
    };

    if (!sessionChecked) checkSession();

    return () => {
      if (sessionChecked) setSessionChecked(false);
    };
  }, [adminSession, router.pathname, sessionChecked]);

  React.useEffect(() => {
    if (sessionChecked && isValidating) setIsValidating(false);
  }, [isValidating, sessionChecked]);

  React.useEffect(() => {
    const isAdminRoute = router.pathname.includes("/admin");
    const acceptedRoutes = ["/auth/admin/login", "/auth/admin/create-account"];
    const unAuthPathAndNoSession = !isValidating && !adminSession && !acceptedRoutes.includes(router.pathname);
    const loginPathAndSession = !isValidating && adminSession && acceptedRoutes.includes(router.pathname);

    if (unAuthPathAndNoSession && isAdminRoute) router.push("/auth/admin/login");
    if (loginPathAndSession && isAdminRoute) router.push("/admin/dashboard");
  }, [adminSession, isValidating, router]);

  console.log("Session isVaidating: ", isValidating);

  const value: SessionContextT = {
    login,
    logout,
    signUp,
    session,
    admin: {
      login: adminLogin,
      logout: adminLogout,
      signUp: adminSignup,
      session: adminSession,
    },
  };

  return <SessionContext.Provider value={value}>{isValidating ? <></> : children}</SessionContext.Provider>;
}
