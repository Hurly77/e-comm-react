import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useRouter } from "next/router";
import { cls } from "@/app/helpers/twind-helpers";

export interface AccountCartPops {
  title: React.ReactNode;
  children: React.ReactNode;
  link?: string;
  disablePress?: boolean;
}

export default function AccountCard({ title, children, link, disablePress }: AccountCartPops) {
  const router = useRouter();

  function handleOnClick() {
    if (link) router.push(link);
  }

  return (
    <Card
      onPress={handleOnClick}
      classNames={{}}
      disableRipple
      isPressable={disablePress ? false : true}
      className="min-h-32 p-2 w-full"
      radius="sm"
    >
      <CardHeader
        onClick={() => link && router.push(link)}
        className={cls("flex items-center", link ? "cursor-pointer" : "")}
      >
        <div className="text-xl font-medium w-full text-left">{title}</div>
      </CardHeader>
      <div className="px-2 w-full">
        <Divider />
      </div>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
