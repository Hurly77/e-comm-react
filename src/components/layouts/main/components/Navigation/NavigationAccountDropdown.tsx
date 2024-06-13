import React from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import useSession from "@/components/layouts/app/hooks/useSession";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";

interface NavigationAccountDropdownT {
  user: AuthUser;
}

export default function NavigationAccountDropdown(props: NavigationAccountDropdownT) {
  const { user } = props;
  const { logout } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);

  const dropDownItems = [
    {
      id: "acc-menu--index",
      text: "Account",
      href: "/account",
    },
    {
      id: "acc-menu-orders",
      text: "Orders",
      href: "/account/orders",
    },
    {
      id: "menu-logout",
      text: "Logout",
      href: "",
      onClick: logout,
      color: "danger" as const,
    },
  ];

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Button radius="sm" variant="light" className="font-medium text-medium group gap-1">
          <span>{user.first_name}</span>
          <UserCircleIcon className="h-6 w-6" />
          <span className="opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ChevronDownIcon className={cls("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")} />
          </span>{" "}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {dropDownItems.map(({ id, href, text, color, onClick }) => (
          <DropdownItem
            key={id}
            color={color}
            variant="solid"
            href={href}
            onClick={onClick ? onClick : (e) => e.preventDefault()}
          >
            {text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
