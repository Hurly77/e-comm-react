import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Divider, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

export default function NavigationSearch() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setSearch(value);
  }

  function handleOnSearch() {
    router.push({
      pathname: "/products/search",
      query: { q: search },
    });
  }

  const handleOnClearInput = () => setSearch("");

  const endContent = (
    <div className="max-w-sm flex space-x-2 h-7 text-small items-center">
      {search && (
        <>
          <XMarkIcon onClick={handleOnClearInput} className="h-5 w-5 cursor-pointer" />
          <Divider orientation="vertical" />
        </>
      )}
      <MagnifyingGlassIcon onClick={handleOnSearch} className="h-5 w-5 cursor-pointer" />
    </div>
  );

  return (
    <Input
      value={search}
      endContent={endContent}
      onChange={handleOnChange}
      placeholder="What can we help you find"
      onKeyDown={(e) => (e.key === "Enter" ? handleOnSearch() : null)}
    />
  );
}
