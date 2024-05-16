import InventoryTable from "./InventoryTable";
import { InventoryContentProvider } from "../../context/InventoryContext";

export default function Inventory() {
  return (
    <InventoryContentProvider>
      <div className="page flex-col px-10">
        <h1>Admin Dashboard</h1>
        <InventoryTable />
      </div>
    </InventoryContentProvider>
  );
}
