import { Button, Card, CardBody, Link } from "@nextui-org/react";
import useSession from "../../app/hooks/useSession";
import Cart from "../components/Cart/Cart";

export default function CartPage() {
  const { session } = useSession();

  return (
    <div className="w-full max-w-screen-xl pt-6 px-4 flex items-center flex-col">
      {session ? (
        <Cart />
      ) : (
        <Card className="w-full min-h-96">
          <CardBody>
            <div className="flex items-center h-full">
              <div className="w-full flex flex-col items-center">
                <h1 className="text-2xl font-medium">Your cart is empty</h1>
                <p className="text-lg text-center">Have and account? Sign in to see your cart</p>
                <Button as={Link} href="/auth/login" size="lg" color="primary" radius="sm" className="my-4 w-96">
                  Sign In
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
