export const COMMERCE_EPS = {
  get: {
    products: "product",
    categories: "category",
    category_id: "category/children/:id",
    product_id: "product/:id",
    product_by_category_id: "product/category/:id",
  },
  post: {
    login: "auth/login",
    signup: "auth/register",
  },
  patch: {},
  put: {},
  delete: {
    logout: "auth/logout",
  },
};

export const ADMIN_EPS = {
  get: {
    products: "product",
  },
  post: {
    products: "product",
    login: "auth/admin/login",
    signup: "auth/admin/register",
  },
  patch: {},
  put: {},
  delete: {
    logout: "auth/logout",
    product: "product/:id",
  },
};
