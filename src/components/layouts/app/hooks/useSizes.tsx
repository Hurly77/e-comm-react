import React from "react";

export default function useSizes<T extends HTMLElement>(ref: React.MutableRefObject<T | null>) {
  const [sizes, setSizes] = React.useState({
    height: 0,
    width: 0,
  });

  const [, setWidth] = React.useState(0);

  React.useEffect(() => {
    function handleResize() {
      if (ref.current) setWidth(ref?.current?.clientWidth);
      setSizes({
        height: ref?.current?.clientHeight || 0,
        width: ref?.current?.clientWidth || 0,
      });
    }

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return sizes;
}
