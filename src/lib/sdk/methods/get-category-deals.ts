import { CategoryModel } from "../models/CategoryModel";
import { ecommApi } from "../utility/apis";

export async function getCategoryDeals() {
  const response = await ecommApi.get<CategoryModel[]>("category_deals");

  return response.data;
}
