import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import { NAV_LINKS } from "../../constants/nav";

import NavigationShoppingCart from "./NavigationShoppingCart";
import NavigationAccountButton from "./NavigationAccountButton";
import NavigationCategoryMenu from "./NavigationCategoryMenu";
import NavigationSearch from "./NavigationSearch";

export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar maxWidth="2xl" className="shadow sticky top-0">
      <NavbarContent justify="center" className="sm:gap-0 gap-x-6">
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <div>
          <NavbarBrand>
            <Button variant="light" isIconOnly onPress={() => router.push("/")}>
              <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            </Button>
          </NavbarBrand>
        </div>
      </NavbarContent>

      <NavbarContent justify="start" className="hidden sm:flex">
        <NavbarItem>
          <NavigationCategoryMenu />
        </NavbarItem>

        {NAV_LINKS.map(({ key, href, title }) => (
          <NavbarItem key={key}>
            <Button radius="sm" className="font-medium text-medium" variant="light" onClick={() => router.push(href)}>
              {title}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-x-2 sm:gap-x-4">
        <NavbarItem className="">
          <NavigationSearch />
        </NavbarItem>
        <NavbarItem className="hidden sm:block">
          <NavigationAccountButton />
        </NavbarItem>
        <NavbarItem>
          <NavigationShoppingCart />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {NAV_LINKS.map(({ key, href, title }) => (
          <NavbarItem key={key}>
            <Button radius="sm" className="font-medium text-medium" variant="light" onClick={() => router.push(href)}>
              {title}
            </Button>
          </NavbarItem>
        ))}

        <NavbarItem>
          <NavigationAccountButton />
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
