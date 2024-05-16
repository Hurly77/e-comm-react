import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
  Image,
} from "@nextui-org/react";
import useInventory from "../../hooks/useInventory";
import { ProductModel } from "@/lib/sdk/models/ProductModel";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import InventoryNewProduct from "./InventoryNewProduct";

const INVENTORY_TABLE_COLUMNS = [
  { uid: "thumbnailUrl", name: "Thumbnail" },
  { uid: "title", name: "Product Name" },
  { uid: "SKU", name: "SKU" },
  { uid: "description", name: "Description" },
  { uid: "price", name: "Price" },
  { uid: "stock", name: "Total In Stock" },
  { uid: "created_at", name: "Created On" },
  { uid: "updated_at", name: "Last Updated" },
  { uid: "actions", name: "Actions" },
];

export default function InventoryTable() {
  const inventoryCtx = useInventory();
  const { inventory, isLoading } = inventoryCtx;

  const renderCell = React.useCallback(
    (item: ProductModel, colKey: React.Key) => {
      function TableActions({ item }: { item: ProductModel }) {
        return (
          <div className="flex gap-x-2">
            <Tooltip content="Edit Product">
              <PencilIcon className="cursor-pointer stroke-secondary h-5 w-5" />
            </Tooltip>

            <Tooltip content="Delete Product">
              <TrashIcon
                onClick={() => {
                  console.log("Delete Product");
                  inventoryCtx.delete(item);
                }}
                className="cursor-pointer stroke-danger h-5 w-5"
              />
            </Tooltip>
          </div>
        );
      }

      const value = item[colKey as keyof ProductModel];
      switch (colKey) {
        case "title":
          return item.title;
        case "SKU":
          return item.SKU;
        case "description":
          return item.description;
        case "price":
          return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(item.price);
        case "stock":
          return item.stock;
        case "created_at":
        case "updated_at":
          // the case will only be created_at or updated_at
          // so we can safely cast the value to string
          return Intl.DateTimeFormat("en-US").format(new Date(value as string));
        case "actions":
          return <TableActions item={item} />;
        case "thumbnailUrl":
          return <Image src={item.thumbnailUrl} alt={item.title} width={50} height={50} />;

        default:
          return "";
      }
    },
    [inventoryCtx]
  );

  return (
    <div className="w-full grow gap-y-1 flex flex-col">
      <div className="w-full flex justify-end">
        <InventoryNewProduct />
      </div>
      <Table radius="sm">
        <TableHeader columns={INVENTORY_TABLE_COLUMNS}>
          {(col) => {
            return <TableColumn key={col.uid}>{col.name}</TableColumn>;
          }}
        </TableHeader>
        <TableBody items={inventory ?? []} isLoading={isLoading} loadingContent={<Spinner />}>
          {(item) => (
            <TableRow key={item.id}>
              {(colKey) => <TableCell key={colKey}>{renderCell(item, colKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
