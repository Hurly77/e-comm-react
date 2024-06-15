import { CategoryModel } from "./CategoryModel";

export interface ProductThumbnailModel {
  id: number;
  product_id: number;
  url: string;
  s3_key: string;
  s3_location: string;
  isThumbnail: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductModel {
  id: number;
  title: string;
  SKU: string;
  description: string;
  price: number;
  regularPrice: number;
  purchaseLimit: number;
  specs: Record<string, string>;
  highlights: string[];
  stock: number;
  created_at: string;
  thumbnailUrl: string;
  thumbnail: ProductThumbnailModel[];
  updated_at: string;
  images: ProductThumbnailModel[];
  category: CategoryModel;
}

export interface CreateProductModel {
  title: string;
  SKU: string;
  description: string;
  price: number;
  stock: number;
}
