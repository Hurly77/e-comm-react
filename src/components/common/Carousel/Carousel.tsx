import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";

export default function Carousel({ urls }: { urls: string[] }) {
  return (
    <div>
      <motion.div>
        {urls.map((url) => (
          <Image
            width={300}
            height={200}
            fallbackSrc="https://via.placeholder.com/300x200"
            className="bg-black"
            classNames={{
              wrapper: "bg-default",
            }}
            key={url}
            src="url"
            alt="Motion image"
          />
        ))}
      </motion.div>
    </div>
  );
}
