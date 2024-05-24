// Do not add any imports or exports here. This file is declarative only.
// types exported from this file are available globally.

declare type AuthUserRole = "guest" | "admin" | "user";

declare type AuthToken = {
  token: string;
  exp: string;
};

declare type AuthUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: AuthUserRole;
  googleId: null;
  provider: string;
};

declare type AuthTeam = {
  id: number;
  name: string;
  alias: string;
  creator_id: string;
  dealer_id: number;
  dealers: {
    name: string;
    url: string;
  }[];
  competitors: never[];
};

declare type AuthSession = {
  user: AuthUser;
  token: string;
  expiration: string;
};

declare type QueryType = boolean | string | number | QueryType[];
declare type QueryParams = {
  [key: string]: QueryType;
};
