export type NavLinkData = {
  key: string;
  routes: string[];
  title: string;
  href: string;
  className: string;
};

export const NAV_LINKS: NavLinkData[] = [
  {
    key: "nav-link-1",
    routes: ["/admin/dashboard"],
    title: "Dashboard",
    href: "/admin/dashboard",
    className: "",
  },
  {
    key: "nav-link-2",
    routes: ["/admin/sales"],
    title: "Sales",
    href: "/admin/sales",
    className: "",
  },
];
