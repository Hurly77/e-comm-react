import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

interface SlingShortT<T extends Array<unknown>> {
  children?: React.ReactNode;
  className?: string;
  isSlingshot?: boolean;
  items: T;
  renderItem: (item: T[number], index: number) => React.ReactNode;
}

const iconClasses =
  "absolute z-10 border hover:scale-110 transition-transform border-divider top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md p-1 cursor-pointer";

export function Slingshot<T extends Array<unknown>>(props: SlingShortT<T>) {
  const [isScrollable, setIsScrollable] = React.useState(false);

  const listRef = React.useRef<HTMLDivElement>(null);
  const { isSlingshot, children, className, items, renderItem } = props;
  const [chevronVisibility, setChevronVisibility] = React.useState({
    left: false,
    right: false,
  });

  React.useEffect(() => {
    const scrollWidth = listRef.current?.scrollWidth;
    const clientWidth = listRef.current?.clientWidth;
    // if scrollWidth isn't equal to clientWidth, then it's scrollable
    const canScroll = !(scrollWidth === clientWidth);

    if (isScrollable !== canScroll) setIsScrollable(canScroll);
  }, [isScrollable, isSlingshot]);

  React.useEffect(() => {
    if (listRef.current?.scrollLeft !== undefined) {
      const scrollLeft = listRef.current.scrollLeft;
      const scrollRight = listRef.current.scrollWidth - (scrollLeft + listRef.current.clientWidth);

      setChevronVisibility({
        left: scrollLeft > 0,
        right: scrollRight > 0,
      });
    }
  }, []);

  const scrollItem = React.useCallback((xAmount: number) => {
    if (listRef.current) {
      const scrollLeft = listRef.current.scrollLeft + xAmount;
      const scrollRight = listRef.current.scrollWidth - listRef.current.clientWidth - scrollLeft;

      setChevronVisibility({
        left: scrollLeft > 0,
        right: scrollRight > 0,
      });

      listRef.current.scrollBy({ left: xAmount, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex flex-col items-center relative">
      <div ref={listRef} className={cls(className ?? "", "w-fit gap-2 gap-y-4 py-4")}>
        {items.map((item, index) => renderItem(item, index))}
      </div>

      {isSlingshot && isScrollable && (
        <>
          <ChevronLeftIcon
            onClick={() => scrollItem(-1150)}
            className={cls(!chevronVisibility.left ? "hidden" : "hidden sm:block", iconClasses, "left-2")}
          />
          <ChevronRightIcon
            onClick={() => scrollItem(1150)}
            className={cls(!chevronVisibility.right ? "hidden" : "hidden sm:block", iconClasses, "right-2")}
          />
        </>
      )}

      {children ? children : null}
    </div>
  );
}
