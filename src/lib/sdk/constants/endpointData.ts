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
    admin_login: "auth/admin/login",
    admin_signup: "auth/admin/register",
    // products: "product",
    products: "product",
  },
  patch: {},
  put: {},
  delete: {
    logout: "auth/logout",
    product: "product/:id",
  },
};
