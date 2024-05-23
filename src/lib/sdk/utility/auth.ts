import { ApiService } from "./api-client";
import { ecommApi } from "./apis";

type AuthError = {
  message: string | string[];
  statusCode: number;
  error: string;
} | null;

export type AuthLogin = {
  email: string;
  password: string;
  role: string;
};

export type AuthSignup = {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  role: string;
};

type AuthEPS = {
  get: {};
  post: {
    login: string;
    signup: string;
  };
  put: {};
  delete: {
    logout: string;
  };
  patch: {};
};

type AuthSuccess = { session: AuthSession };

type AuthApi = ApiService<AuthEPS["get"], AuthEPS["post"], AuthEPS["patch"], AuthEPS["delete"], AuthEPS["patch"]>;

export function AuthClient<ApiClient extends AuthApi>(API: ApiClient) {
  async function logout() {
    const response = await API.delete("logout");

    await API.sessionService.removeSession();
    return response;
  }
  async function getSession() {
    return API.sessionService.getSession();
  }
  async function login(payload: AuthLogin) {
    const response = await API.post<AuthSuccess, AuthLogin, AuthError>("login", payload);
    const session = response?.data?.session;

    if (session) API.sessionService.setSession(session);
    return response;
  }
  async function signUp(payload: AuthSignup) {
    const requestData = { ...payload };
    const response = await API.post<AuthSuccess, AuthSignup>("signup", requestData);
    const session = response?.data?.session;

    if (session) await API.sessionService.setSession(session);
    return response;
  }
  async function setSession(_key: string, session: AuthSession) {
    return API.sessionService.setSession(session);
  }

  return { login, signUp, logout, setSession, getSession };
}

export const auth = AuthClient(ecommApi);
