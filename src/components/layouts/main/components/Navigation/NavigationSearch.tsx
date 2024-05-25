import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@nextui-org/react";

export default function NavigationSearch() {
  return <Input placeholder="What can we help you find" endContent={<MagnifyingGlassIcon className="h-5 w-5" />} />;
}
