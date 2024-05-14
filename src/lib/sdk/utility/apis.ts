import { ADMIN_EPS, COMMERCE_EPS } from "../constants/endpointData";
import { ADMIN_SESSION_KEY } from "../constants/session";
import { createApiService } from "./api-client";

export const ecommApi = createApiService(process.env.NEXT_PUBLIC_ECOMM_API_ROOT_URL ?? "", COMMERCE_EPS);

export const ecommAdminApi = createApiService(
  process.env.NEXT_PUBLIC_ECOMM_API_ROOT_URL ?? "",
  ADMIN_EPS,
  ADMIN_SESSION_KEY
);
