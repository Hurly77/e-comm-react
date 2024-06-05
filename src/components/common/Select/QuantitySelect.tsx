import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import React from "react";

interface QuantitySelectT {
  size?: "sm" | "md" | "lg";
  defaultValue?: number;
  purchaseLimit: number;
  onChange?: (value: number) => void;
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
  className?: string;
  isLoading?: boolean;
}
export function QuantitySelect(props: QuantitySelectT) {
  const { purchaseLimit, onChange, size, color, className, defaultValue, isLoading } = props;

  const selectOptions = React.useMemo(
    () => Array.from(Array(purchaseLimit || 5), (_, i) => ({ key: `item-${i}`, value: (i + 1).toString() })),
    [purchaseLimit]
  );

  const defaultKey = defaultValue ? `item-${defaultValue - 1}` : "item-0";

  return (
    <Select
      className={cls(className ?? "w-24")}
      classNames={{
        value: `text-${color ?? "foreground"}`,
        trigger: `border-${color ?? "default"} text-${color ?? "foreground"}`,
      }}
      variant="bordered"
      size={size ?? "lg"}
      radius="sm"
      defaultSelectedKeys={[defaultKey]}
      items={selectOptions}
      color={color ?? "default"}
      endContent={isLoading && <Spinner size="sm" />}
      isDisabled={isLoading}
    >
      {(item) => (
        <SelectItem key={item.key} value={item.value} onClick={() => onChange?.(parseInt(item?.value))}>
          {item.value}
        </SelectItem>
      )}
    </Select>
  );
}
