import { ProductModel } from "../../models/ProductModel";
import { ecommApi } from "../../utility/apis";
import { ProductFilters } from "./interfaces";

export const GET_PRODUCTS = "GET_PRODUCTS";

export async function getProducts(filters: ProductFilters = {}) {
  const response = await ecommApi.get<{ result: ProductModel[]; count: number }>("products", {
    params: filters,
  });

  // eslint-disable-next-line no-console
  console.log(response);

  return response?.data;
}

export async function getProductById(id: string | number) {
  const response = await ecommApi.get<ProductModel>("product_id", { params: { id } });

  return response.data;
}

export async function getProductsByCategory(id: string | number) {
  const response = await ecommApi.get<ProductModel[]>("product_by_category_id", { params: { id } });

  return response.data;
}

export async function createProduct(payload: FormData) {
  const response = await ecommApi.post<ProductModel>("products", payload);

  // eslint-disable-next-line no-console
  console.log(response);

  return response;
}

export function updateProduct() {
  // eslint-disable-next-line no-console
  console.log("updateProduct");
}

export async function deleteProduct(id: number) {
  const response = await ecommApi.delete("product", { params: { id } });
  // eslint-disable-next-line no-console
  console.log(response);
  return response;
}

export * from "./interfaces";
