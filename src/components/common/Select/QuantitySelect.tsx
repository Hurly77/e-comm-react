import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

interface QuantitySelectT {
  size?: "sm" | "md" | "lg";
  defaultValue?: number;
  purchaseLimit: number;
  onChange?: (value: number) => void;
}
export function QuantitySelect(props: QuantitySelectT) {
  const { purchaseLimit, onChange, size, defaultValue } = props;

  const selectOptions = React.useMemo(
    () => Array.from(Array(purchaseLimit || 5), (_, i) => ({ key: `item-${i}`, value: (i + 1).toString() })),
    [purchaseLimit]
  );

  const defaultKey = defaultValue ? `item-${defaultValue - 1}` : "item-0";

  return (
    <Select
      className="w-24"
      variant="bordered"
      size={size ?? "lg"}
      radius="sm"
      defaultSelectedKeys={[defaultKey]}
      items={selectOptions}
    >
      {(item) => (
        <SelectItem key={item.key} value={item.value} onClick={() => onChange?.(parseInt(item?.value))}>
          {item.value}
        </SelectItem>
      )}
    </Select>
  );
}
