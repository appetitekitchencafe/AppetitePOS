import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PurchaseForm({
  onAddItem,
  onSavePurchase,
  items,
}) {
  const [suppliers, setSuppliers] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [supplierId, setSupplierId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [inventoryId, setInventoryId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    loadSuppliers();
    loadInventory();
  }, []);

  const loadSuppliers = async () => {
    const res = await api.get("/purchases/suppliers");
    setSuppliers(res.data.suppliers);
  };

  const loadInventory = async () => {
    const res = await api.get("/inventory");
    setInventory(res.data.inventory);
  };

  const add = () => {
    if (!inventoryId) return;

    const item = inventory.find(
      (i) => i.id === Number(inventoryId)
    );

    onAddItem({
      inventory_item_id: item.id,
      item_name: item.name,
      quantity: Number(quantity),
      purchase_price: Number(price),
    });

    setInventoryId("");
    setQuantity(1);
    setPrice(0);
  };

  return (
    <div className="purchase-form">

      <div className="form-row">

        <select
          value={supplierId}
          onChange={(e)=>setSupplierId(e.target.value)}
        >
          <option value="">Select Supplier</option>

          {suppliers.map((s)=>(
            <option key={s.id} value={s.id}>
              {s.supplier_name}
            </option>
          ))}

        </select>

        <input
          placeholder="Invoice Number"
          value={invoiceNumber}
          onChange={(e)=>setInvoiceNumber(e.target.value)}
        />

        <input
          type="date"
          value={purchaseDate}
          onChange={(e)=>setPurchaseDate(e.target.value)}
        />

      </div>

      <hr/>

      <div className="form-row">

        <select
          value={inventoryId}
          onChange={(e)=>setInventoryId(e.target.value)}
        >

          <option value="">
            Select Inventory Item
          </option>

          {inventory.map((i) => (
  <option key={i.id} value={i.id}>
    {i.name}
  </option>
))}

        </select>

        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e)=>setQuantity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <button onClick={add}>
          Add Item
        </button>

      </div>

      <button
        className="save-btn"
        onClick={()=>onSavePurchase({
          supplier_id:supplierId,
          invoice_number:invoiceNumber,
          purchase_date:purchaseDate,
          items,
        })}
      >
        Save Purchase
      </button>

    </div>
  );
}