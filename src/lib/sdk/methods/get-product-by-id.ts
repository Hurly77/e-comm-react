import { ProductModel } from "../models/ProductModel";
import { ecommApi } from "../utility/apis";

export async function getProductById(id: string | number) {
  const response = await ecommApi.get<ProductModel>("product_id", { params: { id } });

  return response.data;
}
