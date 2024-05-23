import { ProductModel } from "../models/ProductModel";
import { ecommApi } from "../utility/apis";

export async function createProduct(payload: FormData) {
  const response = await ecommApi.post<ProductModel>("products", payload);

  console.log(response);

  return response;
}
