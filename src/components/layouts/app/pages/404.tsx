import { useRouter } from "next/router";

import useSession from "../hooks/useSession";

export default function FourZeroFour() {
  const router = useRouter();
  const { session } = useSession();

  const hasSession = !!session;

  return (
    <div className="flex-col items-center justify-center page">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl">404</h1>
        <p className="text-lg">
          Sorry, this page does&apos;nt seem to exist.{" "}
          <button
            className="underline text-info"
            onClick={() => {
              if (hasSession) router.replace("/dashboard");
              else router.replace("/auth/login");
            }}
          >
            {hasSession ? "Go to dashboard" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
