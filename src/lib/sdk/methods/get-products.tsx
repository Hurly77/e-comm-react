import { ProductModel } from "../models/ProductModel";
import { ecommApi } from "../utility/apis";

export const GET_PRODUCTS = "GET_PRODUCTS";
export async function getProducts() {
  const response = await ecommApi.get<ProductModel[]>("products");

  console.log(response);

  return response?.data;
}
