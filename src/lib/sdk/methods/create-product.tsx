import { ProductModel } from "../models/ProductModel";
import { ecommAdminApi } from "../utility/apis";

export async function createProduct(payload: FormData) {
  const response = await ecommAdminApi.post<ProductModel>("products", payload);

  console.log(response);

  return response;
}
