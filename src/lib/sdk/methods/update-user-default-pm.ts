import { ecommApi } from "../utility/apis";

export async function updateUserDefaultPm(user_id: number, pm_id: string) {
  const response = await ecommApi.patch("default_pm", { user_id, pm_id });

  return response.data;
}
