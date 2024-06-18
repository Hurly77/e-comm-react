import type { EShopBreadcrumbsProps } from "../components/Shared/EShopBreadcrumbs";

export type NavLinkData = {
  key: string;
  routes: string[];
  title: string;
  href: string;
  className: string;
};

export const NAV_LINKS: NavLinkData[] = [
  {
    key: "nav-link-2",
    routes: ["/categories/deals"],
    title: "Deals",
    href: "/categories/deals",
    className: "",
  },
  {
    key: "nav-link-3",
    routes: ["/feeds"],
    title: "New & Featured",
    href: "/feeds",
    className: "",
  },
];

const ACCOUNT_BASE_BREADCRUMBS: EShopBreadcrumbsProps["breadcrumbs"] = [
  {
    label: "Account",
    href: "/account",
  },
];

type AccountBreadcrumbs = "orders" | "addresses" | "about" | "payments" | "paymentEdit" | "addressEdit";
export const ACCOUNT_BREAD_CRUMBS: Record<AccountBreadcrumbs, EShopBreadcrumbsProps["breadcrumbs"]> = {
  orders: [...ACCOUNT_BASE_BREADCRUMBS, { label: "Orders", href: "/account/orders" }],
  addresses: [...ACCOUNT_BASE_BREADCRUMBS, { label: "Addresses", href: "/account/addresses" }],
  payments: [...ACCOUNT_BASE_BREADCRUMBS, { label: "Payments", href: "/account/payments" }],
  about: [...ACCOUNT_BASE_BREADCRUMBS, { label: "About", href: "/account/aboutme" }],
  addressEdit: [
    ...ACCOUNT_BASE_BREADCRUMBS,
    { label: "Addresses", href: "/account/shipping" },
    { label: "Edit", href: "/account/shipping/[id]" },
  ],
  paymentEdit: [
    ...ACCOUNT_BASE_BREADCRUMBS,
    { label: "Payments", href: "/account/payments" },
    { label: "Edit", href: "/account/payments/[id]" },
  ],
};
