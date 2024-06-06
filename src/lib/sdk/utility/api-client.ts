import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

import { SESSION_KEY } from "../constants/session";

// formats the response to be used by the Methods and catches any errors
async function handelResponse<R extends Promise<AxiosResponse>, Err>(response: R) {
  const JResponse = {
    data: undefined as Awaited<R>["data"] | undefined,
    error: undefined as AxiosError | Err | undefined,
  };
  try {
    const res = await response;
    JResponse.data = res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      JResponse.error = error.response?.data as Err;
    } else if (isAxiosError(error)) {
      JResponse.error = error;
    }
  }

  return JResponse;
}

// This this replaces catch all segments in the url with the value in the params object
// If there is a param passed to the Axios Instance, "user_id" and a catch all segment in the url, "/users/:user_id"
// The cath all segment will be replaced with the value of the param
function paramsTransformer(this: InternalAxiosRequestConfig, data: unknown, headers: AxiosHeaders) {
  let pathname = this.url;
  const params = this.params ?? {};
  const newParams = {} as Record<string, string>;

  // iterates through the params object and replaces the catch all segments in the url with the value of the param
  for (const [key, value] of Object.entries<string>(params)) {
    if (pathname?.includes(`:${key}`)) {
      pathname = pathname.replace(`:${key}`, value as string);
      continue;
    } else {
      newParams[key] = value;
    }
  }

  this.params = newParams;
  this.url = pathname;
  this.data = data;
  this.headers = headers;

  // Ensure that form data boundaries are set correctly
  // When data is a FormData object, the Content-Type header is automatically set to multipart/form-data
  if (this.data instanceof FormData) return this.data;

  return JSON.stringify(this.data);
}

// Simple Class for managing the Local Session.
export class SessionService {
  public key: string;
  public session: AuthSession | undefined;
  constructor(public sessionKey?: string) {
    this.key = sessionKey ?? SESSION_KEY;
    if (!this.session) {
      this.getSession();
    }
  }

  async tryParseSession(session: string) {
    try {
      return JSON.parse(session) as AuthSession;
    } catch (e) {
      return undefined;
    }
  }

  async getSession() {
    if (typeof localStorage !== "undefined") {
      const session = localStorage.getItem(this.key);
      this.session = session ? await this.tryParseSession(session) : undefined;
      return this.session;
    }
    return undefined;
  }

  async setSession(session: AuthSession) {
    localStorage.setItem("_expiredToken", session.exp);
    localStorage.setItem(this.key, JSON.stringify(session));
    this.session = session;
  }

  async removeSession() {
    localStorage.removeItem(this.key);
    localStorage.removeItem("_expiredToken");
    this.session = undefined;
  }
}

type R = Record<string, string>;
type EPStructure<G = R, P = R, PUT = R, D = R, PATCH = R> = {
  get: {
    [Property in keyof G]: string;
  };
  post: {
    [Property in keyof P]: string;
  };
  put: {
    [Property in keyof PUT]: string;
  };
  delete: {
    [Property in keyof D]: string;
  };
  patch: {
    [Property in keyof PATCH]: string;
  };
};

// This is the main class that will be used to make requests to the API
// The Generic Types are the Endpoints that will be used by the class
// i.e get => {users: "/users", user_by_id: "/users/:user_id"}
export class ApiService<GET, POST, PUT, DEL, PATCH> {
  public instance: AxiosInstance;
  public sessionService: SessionService;
  public EPS: EPStructure<GET, POST, PUT, DEL, PATCH>;
  constructor(baseURL = "", ENDPOINTS: EPStructure<GET, POST, PUT, DEL, PATCH>, sessionKey: string = SESSION_KEY) {
    this.EPS = ENDPOINTS;
    this.sessionService = new SessionService(sessionKey);
    this.instance = axios.create({
      baseURL: baseURL,
      transformRequest: [paramsTransformer], // replaces catch all segments in the url with the value in the params object
      // withCredentials: true, // sends cookies with the request
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.sessionService.session?.token}`,
      },
    });

    // Sets the Authorization header for each request
    this.instance.interceptors.request.use(async (config) => {
      return this.sessionService.getSession().then((session) => {
        const Authorization = `Bearer ${session?.token}`;
        const hasToken = session?.token;
        if (hasToken) {
          config.headers.Authorization = Authorization;
          return config;
        } else {
          delete config.headers.Authorization;
          return config;
        }
      });
    });
  }

  // Each of the following methods will uses EPS, an Object containing all the endpoints.
  // The endpoints are categorized by the HTTP method they use.

  // Every Method uses the handleResponse function which i just used to format the data consistently
  // I.E {data : T, error: E}

  // Each method as Three Generics:
  // T: The type of the data in the response
  // D: The type of the body passed to the request
  // E: The type of the error that can be returned

  async get<T, D = unknown, E = unknown>(url: keyof GET, config?: AxiosRequestConfig<D>) {
    const promise = this.instance.get<T, AxiosResponse<T, D>, D>(this.EPS.get[url], config);
    return handelResponse<typeof promise, E>(promise);
  }

  async post<T, D = unknown, E = unknown>(url: keyof POST, data: D, config?: AxiosRequestConfig<D>) {
    const promise = this.instance.post<T, AxiosResponse<T, D>, D>(this.EPS.post[url], data, config);
    return handelResponse<typeof promise, E>(promise);
  }

  async postForm<T, D = unknown, E = unknown>(url: keyof POST, data: D, config?: AxiosRequestConfig<D>) {
    const promise = this.instance.postForm<T, AxiosResponse<T, D>, D>(this.EPS.post[url], data, config);
    return handelResponse<typeof promise, E>(promise);
  }

  async put<T, D = unknown, E = unknown>(url: keyof PUT, data?: D, config?: AxiosRequestConfig<D>) {
    const promise = this.instance.put<T, AxiosResponse<T, D>, D>(this.EPS.put[url], data, config);
    return handelResponse<typeof promise, E>(promise);
  }

  async delete<T, D = unknown, E = unknown>(url: keyof DEL, config?: AxiosRequestConfig<D>) {
    const promise = this.instance.delete<T, AxiosResponse<T, D>, D>(this.EPS.delete[url], config);
    return handelResponse<typeof promise, E>(promise);
  }

  async patch<T, D = unknown, E = unknown>(url: keyof PATCH, data?: D, config?: AxiosRequestConfig<D>) {
    const promise = this.instance.patch<T, AxiosResponse<T, D>, D>(this.EPS.patch[url], data, config);
    return handelResponse<typeof promise, E>(promise);
  }
}

export function createApiService<EPs extends EPStructure>(baseURL: string, ENDPOINTS: EPs, sessionKey?: string) {
  return new ApiService<EPs["get"], EPs["post"], EPs["put"], EPs["delete"], EPs["patch"]>(
    baseURL,
    ENDPOINTS,
    sessionKey
  );
}
