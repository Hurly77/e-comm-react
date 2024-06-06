import useSession from "@/components/layouts/app/hooks/useSession";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import NavigationAccountDropdown from "./NavigationAccountDropdown";

export default function NavigationAccountButton() {
  const router = useRouter();
  const { session } = useSession();
  function handleLogout() {
    // sessionCtx.logout();
    router.push("/auth/login");
  }

  return (
    <>
      {session ? (
        <NavigationAccountDropdown user={session.user} />
      ) : (
        <Button radius="sm" className="text-md hover:text-medium" variant="light" onClick={handleLogout}>
          <div className="flex items-center gap-x-2">
            <span className="text-sm">Sign in</span>
            <UserCircleIcon className="h-6 w-6" />
          </div>
        </Button>
      )}
    </>
  );
}
