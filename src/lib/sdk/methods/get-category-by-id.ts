import { CategoryModel } from "../models/CategoryModel";
import { ecommApi } from "../utility/apis";

export async function getCategoryById(id: string | number) {
  const response = await ecommApi.get<CategoryModel>("category_id", { params: { id } });

  return response.data;
}
