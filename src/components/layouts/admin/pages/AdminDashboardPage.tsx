import InventoryTable from "../components/Inventory/InventoryTable";

export function AdminDashboardPage() {
  return (
    <div className="page flex-col px-10">
      <h1>Admin Dashboard</h1>
      <InventoryTable />
    </div>
  );
}
