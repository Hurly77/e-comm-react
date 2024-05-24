import React from "react";
import { Button } from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export interface DropdownButtonT {
  text: string;
}

export default function DropdownButton() {
  return (
    <Button radius="sm" variant="light" className="font-medium text-medium border group px-2 gap-1">
      Categories
      <span className="opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <ChevronDownIcon className="h-4 w-4" />
      </span>{" "}
    </Button>
  );
}
