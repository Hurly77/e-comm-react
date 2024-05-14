import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import useSession from "@/components/layouts/app/hooks/useSession";

import { NAV_LINKS } from "../../constants/nav";

export default function Navigation() {
  const router = useRouter();
  const sessionCtx = useSession();

  function handleLogout() {
    sessionCtx.admin.logout();
  }

  return (
    <Navbar maxWidth="full" className="shadow bg-background bg-opacity-50 sticky top-0">
      <NavbarContent justify="start">
        {NAV_LINKS.map(({ key, href, title }) => (
          <NavbarItem key={key}>
            <Button
              color="primary"
              radius="sm"
              className="border-none text-md hover:text-medium"
              variant="ghost"
              onClick={() => router.push(href)}
            >
              {title}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="danger"
            radius="sm"
            className="border-none text-md hover:text-medium"
            variant="ghost"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
