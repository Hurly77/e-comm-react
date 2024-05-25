import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import React from "react";
import useCategories from "../../hooks/useCategories";

export default function NavigationCategoryMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { categories } = useCategories();

  return (
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
  );
}
