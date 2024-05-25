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
