import { AuthLogin, AuthSignup } from "@/sdk/utility/auth";

export type SessionContextT = {
  session: AuthSession | null;
  login: (payload: AuthLogin) => Promise<boolean>;
  logout: () => Promise<void>;
  signUp: (payload: AuthSignup) => Promise<void>;
};
