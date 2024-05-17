import { Button, Input, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import useSession from "@/components/layouts/app/hooks/useSession";

import { NAV_LINKS } from "../../constants/nav";
import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const router = useRouter();
  const sessionCtx = useSession();

  function AccountIcon() {
    const session = sessionCtx.session;
    if (session) {
      <UserIcon className="h-6 w-6" />;
    } else {
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-sm">Sign in</span>
          <UserCircleIcon className="h-6 w-6" />
        </div>
      );
    }
  }

  function handleLogout() {
    sessionCtx.logout();
    router.push("/auth/login");
  }

  return (
    <Navbar maxWidth="full" className="shadow sticky top-0">
      <NavbarContent justify="start">
        {NAV_LINKS.map(({ key, href, title }) => (
          <NavbarItem key={key}>
            <Button
              radius="sm"
              className="border-none font-medium text-medium"
              variant="light"
              onClick={() => router.push(href)}
            >
              {title}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Input placeholder="What can we help you find" endContent={<MagnifyingGlassIcon className="h-5 w-5" />} />
        </NavbarItem>
        <NavbarItem>
          <Button radius="sm" className="border-none text-md hover:text-medium" variant="light" onClick={handleLogout}>
            <AccountIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button radius="sm" className="border-none text-md hover:text-medium" variant="light">
            <ShoppingCartIcon className="h-6 w-6" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
