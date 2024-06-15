import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export interface EShopBreadcrumbsProps {
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export default function EShopBreadcrumbs({ breadcrumbs }: EShopBreadcrumbsProps) {
  return (
    <Breadcrumbs>
      {breadcrumbs.map(({ label, href }) => (
        <BreadcrumbItem key={href} href={href}>
          {label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
