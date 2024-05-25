import useSession from "@/components/layouts/app/hooks/useSession";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function NavigationAccountButton() {
  const router = useRouter();
  const sessionCtx = useSession();
  function handleLogout() {
    // sessionCtx.logout();
    router.push("/auth/login");
  }

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
  return (
    <Button radius="sm" className="text-md hover:text-medium" variant="light" onClick={handleLogout}>
      <AccountIcon />
    </Button>
  );
}
