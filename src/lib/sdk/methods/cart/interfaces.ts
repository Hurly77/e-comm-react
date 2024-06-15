export interface CreateCartItemT {
  productId: number;
  userId: number;
}

export interface DeleteCartItemT {
  userId: number;
  cartItemId: string;
}

export interface UpdateCartItemT {
  userId: number;
  cartItemId: string;
  quantity: number;
}
