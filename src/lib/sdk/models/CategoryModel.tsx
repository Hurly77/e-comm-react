import { ProductModel } from "./ProductModel";

export interface CategoryModel {
  id: number;
  name: string;
  web_id: string;
  children: CategoryModel[];
  parent: CategoryModel | null;
  imgURL: string | null;
  products: ProductModel[];
}
