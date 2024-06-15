import { CategoryModel } from "../../models/CategoryModel";
import { ecommApi } from "../../utility/apis";

export async function getCategories() {
  const { data } = await ecommApi.get<CategoryModel[]>("categories");
  return data;
}

export async function getCategoryById(id: string | number) {
  const response = await ecommApi.get<CategoryModel>("category_id", { params: { id } });

  return response.data;
}

export async function getCategoryDeals() {
  const response = await ecommApi.get<CategoryModel[]>("category_deals");

  return response.data;
}
