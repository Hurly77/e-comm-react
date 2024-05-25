import { ProductModel } from "../models/ProductModel";
import { ecommApi } from "../utility/apis";

export const GET_PRODUCTS = "GET_PRODUCTS";
type ProductFilters = {
  take?: number;
  skip?: number;
  deals?: boolean;
};

export async function getProducts(filters: ProductFilters = {}) {
  const response = await ecommApi.get<ProductModel[]>("products", {
    params: { ...filters, deals: true },
  });

  // eslint-disable-next-line no-console
  console.log(response);

  return response?.data;
}
