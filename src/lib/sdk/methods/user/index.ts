import { UpdateUserInfoPayload } from "./interfaces";
import { ecommApi } from "../../utility/apis";

export function updateUserInformation(user_id: number, userData: Partial<UpdateUserInfoPayload>) {
  return ecommApi.patch<{ message: string }>("update_user", userData, { params: { user_id } });
}

export * from "./interfaces";
