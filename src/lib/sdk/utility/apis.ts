import { COMMERCE_EPS } from "../constants/endpointData";
import { createApiService } from "./api-client";

export const ecommApi = createApiService(process.env.NEXT_PUBLIC_ECOMM_API_ROOT_URL ?? "", COMMERCE_EPS);
