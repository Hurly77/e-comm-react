import { CategoryModel } from "@/lib/sdk/models/CategoryModel";
import { Image, Link } from "@nextui-org/react";

interface CategoryBubbleT {
  category: CategoryModel;
  isDeal?: boolean;
}

export default function CategoryBubble(props: CategoryBubbleT) {
  const { category, isDeal } = props;

  const href = isDeal ? `/categories/deals/${category.id}` : `/categories/${category.id}`;

  return (
    <Link
      color="foreground"
      href={href}
      underline="hover"
      className="items-center flex flex-col snap-center cursor-pointer"
    >
      <div
        className="border relative flex items-center bg-[#efefef] h-24 w-24 overflow-hidden justify-center xl:h-44 xl:w-44  rounded-full"
        key={category.id}
      >
        {category.imgURL ? (
          <Image
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
      <span className="w-full text-center text-sm max-w-16 lg:max-w-40">{category.name}</span>
    </Link>
  );
}
