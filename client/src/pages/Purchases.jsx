import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PurchaseForm from "../components/purchases/PurchaseForm";
import PurchaseTable from "../components/purchases/PurchaseTable";
import api from "../services/api";
import "../styles/purchases.css";

export default function Purchases() {
  const [items, setItems] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      const res = await api.get("/purchases");

      if (res.data.success) {
        setPurchases(res.data.purchases);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const savePurchase = async (purchaseData) => {
    if (purchaseData.items.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    if (!purchaseData.supplier_id) {
      alert("Please select a supplier.");
      return;
    }

    try {
      const res = await api.post(
        "/purchases",
        purchaseData
      );

      if (res.data.success) {
        alert("Purchase Saved Successfully!");

        setItems([]);

        loadPurchases();
      }
    } catch (err) {
      console.error(err);

      alert("Failed to save purchase.");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="page-title">
        📦 Purchase Management
      </h1>

      <PurchaseForm
        onAddItem={addItem}
        onSavePurchase={savePurchase}
        items={items}
      />

      <PurchaseTable
        items={items}
        setItems={setItems}
      />

      <div className="report-section">

        <h2>Purchase History</h2>

        <table className="recent-table">

          <thead>

            <tr>

              <th>#</th>

              <th>Invoice</th>

              <th>Supplier</th>

              <th>Date</th>

              <th>Total</th>

            </tr>

          </thead>

          <tbody>

            {purchases.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No Purchases Found
                </td>
              </tr>
            ) : (
              purchases.map((purchase, index) => (
                <tr key={purchase.id}>
                  <td>{index + 1}</td>

                  <td>
                    {purchase.invoice_number}
                  </td>

                  <td>
                    {purchase.supplier_name}
                  </td>

                  <td>
                    {purchase.purchase_date}
                  </td>

                  <td>
                    ₹
                    {Number(
                      purchase.total
                    ).toFixed(2)}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}