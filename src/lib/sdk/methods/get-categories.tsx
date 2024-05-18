import { CategoryModel } from "../models/CategoryModel";
import { ecommApi } from "../utility/apis";

export async function getCategories() {
  const { data } = await ecommApi.get<CategoryModel[]>("categories");
  return data;
}
