import Stripe from "stripe";
import { ecommApi } from "../utility/apis";

export async function getSetupIntent(user_id: number) {
  const response = await ecommApi.get<Stripe.SetupIntent>("setup_intent", { params: { user_id } });

  return response.data;
}
