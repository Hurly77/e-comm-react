import { CategoryModel } from "../models/CategoryModel";
import { ProductModel } from "../models/ProductModel";
import { ecommApi } from "../utility/apis";

export async function getProductsByCategory(id: string | number) {
  const response = await ecommApi.get<ProductModel[]>("product_by_category_id", { params: { id } });

  return response.data;
}
