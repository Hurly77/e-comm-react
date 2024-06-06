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
        <DropdownItem onClick={logout}>Logout</DropdownItem>
        <DropdownItem>Account</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
