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
    // user shipping address
    user_shipping_address: "/user/shipping-address/:user_id",
    // Checkout
    payment_methods: "/checkout/pm/methods/customer/:user_id",
    setup_intent: "/checkout/pm/setup-intent/customer/:user_id",
    // orders
    user_orders: "/order/user/:user_id",
    single_order: "/order/user/:user_id/single/:order_id",
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
    // user shipping address
    user_shipping_address: "/user/shipping-address/:user_id",
    // Checkout
    payment_intent: "/checkout/pm/payment-intent",
    // order
    order: "/order",
  },
  patch: {
    //cart
    cart_item: "/cart/item",
    // checkout
    default_pm: "/checkout/pm/customer/default",
  },
  put: {},
  delete: {
    logout: "auth/logout",
    product: "product/:id",

    //cart
    cart_item: "/cart/item",
  },
};
