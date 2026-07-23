import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";
import "../styles/inventory.css";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const res = await api.get("/inventory");

      if (res.data.success) {
        setInventory(res.data.inventory);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addStock = async (id) => {
    const qty = prompt("Enter quantity to add:");

    if (!qty || Number(qty) <= 0) return;

    try {
      await api.put(`/inventory/${id}`, {
        quantity: Number(qty),
      });

      loadInventory();
    } catch (err) {
      console.error(err);
      alert("Failed to update stock.");
    }
  };

  const filtered = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="inventory-title">📦 Inventory</h1>

      <input
        className="inventory-search"
        placeholder="Search ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Stock</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>

              <td>{item.stock}</td>

              <td>{item.unit}</td>

              <td>
                {Number(item.stock) <= Number(item.low_stock) ? (
                  <span className="low-stock">🔴 Low Stock</span>
                ) : (
                  <span className="good-stock">🟢 In Stock</span>
                )}
              </td>

              <td>
                <button
                  className="stock-btn"
                  onClick={() => addStock(item.id)}
                >
                  + Add Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}