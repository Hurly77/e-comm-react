export const COMMERCE_EPS = {
  get: {
    //product
    products: "product",
    product_id: "product/:id",
    product_by_category_id: "product/category/:id",
    //category
    categories: "category",
    category_id: "category/children/:id",
    category_deals: "category/deals",
    //cart
    get_cart: "/cart/:userId",
  },
  post: {
    //Auth
    login: "auth/login",
    signup: "auth/register",
    // Admin Auth
    admin_login: "auth/admin/login",
    admin_signup: "auth/admin/register",
    // products: "product",
    products: "product",
    //cart
    add_item: "/cart/item",
  },
  patch: {
    //cart
    cart_item: "/cart/item",
  },
  put: {},
  delete: {
    logout: "auth/logout",
    product: "product/:id",

    //cart
    cart_item: "/cart/item",
  },
};
