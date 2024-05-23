import { CategoryModel } from "@/lib/sdk/models/CategoryModel";
import { Image, Link } from "@nextui-org/react";
import { default as NextImage } from "next/image";

interface CategoryBubbleT {
  category: CategoryModel;
}

export default function CategoryBubble(props: CategoryBubbleT) {
  const { category } = props;

  return (
    <Link
      color="foreground"
      href={`/categories/${category.id}`}
      underline="hover"
      className="items-center flex flex-col snap-center cursor-pointer"
    >
      <div
        className="border relative flex items-center bg-[#efefef] h-24 w-24 overflow-hidden justify-center xl:h-44 xl:w-44  rounded-full"
        key={category.id}
      >
        {category.imgURL ? (
          <Image
            as={NextImage}
            height={176}
            width={176}
            src={category?.imgURL}
            alt={category?.name}
            className="object-cover rounded-full xl:h-[178px] xl:w-[178px] h-24 w-24"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="w-fit text-center text-sm xl:text-xl bg-[#efefef]">{category.name}</span>
        )}
      </div>
      <span className="w-full text-center text-sm">{category.name}</span>
    </Link>
  );
}
