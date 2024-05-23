import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";

import useSession from "@/components/layouts/app/hooks/useSession";

import { NAV_LINKS } from "../../constants/nav";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import useCategories from "../../hooks/useCategories";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";

export default function Navigation() {
  const router = useRouter();
  const sessionCtx = useSession();
  const [isOpen, setIsOpen] = React.useState(false);

  const { categories } = useCategories();

  function AccountIcon() {
    const session = sessionCtx.session;
    if (session) {
      return (
        <div className="flex items-center gap-x-2">
          <span>{session?.user.first_name}</span>
          <UserCircleIcon className="h-6 w-6" />
        </div>
      );
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
    // sessionCtx.logout();
    router.push("/auth/login");
  }

  return (
    <Navbar maxWidth="2xl" className="shadow sticky top-0">
      <NavbarContent justify="start">
        {/* <NavbarBrand>Cameron</NavbarBrand> */}
        <NavbarItem>
          <Dropdown isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} radius="sm" size="sm" classNames={{}}>
            <DropdownTrigger>
              <Button radius="sm" variant="light" className="font-medium text-medium group gap-1">
                Categories
                <span className="opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <ChevronDownIcon className={cls("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")} />
                </span>{" "}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {(categories ?? []).map(({ id, name }) => (
                <DropdownItem
                  color="primary"
                  variant="light"
                  className="border-b last:border-none text-xl"
                  href={`/categories/${id}`}
                  key={id}
                >
                  {name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        {NAV_LINKS.map(({ key, href, title }) => (
          <NavbarItem key={key}>
            <Button radius="sm" className="font-medium text-medium" variant="light" onClick={() => router.push(href)}>
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
