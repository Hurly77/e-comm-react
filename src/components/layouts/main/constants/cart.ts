import { HTMLMotionProps } from "framer-motion";

export const CART_MOTION_PROPS: HTMLMotionProps<"section"> = {
  initial: {
    x: 500,
  },
  variants: {
    enter: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      y: 0,
      x: 500,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  },
};
