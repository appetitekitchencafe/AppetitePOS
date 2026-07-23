import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";
import "../styles/orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/order-management");

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      await api.put(`/order-management/${id}/cancel`);
      loadOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const printReceipt = async (id) => {
    try {
      const res = await api.get(`/receipt/${id}`);

      if (!res.data.success) return;

      const { order, items } = res.data;

      const receiptWindow = window.open("", "_blank");

      receiptWindow.document.write(`
<html>
<head>
<title>Receipt</title>

<style>

body{
font-family:monospace;
width:300px;
padding:20px;
}

h2{
text-align:center;
margin:0;
}

hr{
border:1px dashed #000;
}

table{
width:100%;
border-collapse:collapse;
}

td{
padding:4px 0;
}

.total{
font-weight:bold;
font-size:18px;
}

.center{
text-align:center;
}

</style>

</head>

<body>

<h2>🍔 APPETITE KITCHEN</h2>

<p class="center">
Order : ${order.order_number}
</p>

<hr>

<table>

${items
  .map(
    (i) => `
<tr>
<td>${i.name} x${i.quantity}</td>
<td align="right">₹${(
  i.price * i.quantity
).toFixed(2)}</td>
</tr>
`
  )
  .join("")}

</table>

<hr>

<p>Subtotal : ₹${Number(order.total).toFixed(2)}</p>

<p>GST : ₹${Number(order.gst).toFixed(2)}</p>

<h3 class="total">
TOTAL : ₹${Number(order.grand_total).toFixed(2)}
</h3>

<p>
Payment : ${order.payment_method}
</p>

<hr>

<p class="center">
❤️ Thank You ❤️
</p>

<script>
window.onload=function(){
window.print();
window.close();
}
</script>

</body>
</html>
`);

      receiptWindow.document.close();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = orders.filter((o) =>
    o.order_number
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="orders-title">📋 Orders</h1>

      <input
        className="orders-search"
        placeholder="Search Order..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filtered.map((order) => (
        <div
          className="order-card"
          key={order.id}
        >
          <div className="order-header">
            <div>
              <h2>{order.order_number}</h2>

              <p>
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>
            </div>

            <span
              className={`status ${order.status.toLowerCase()}`}
            >
              {order.status}
            </span>
          </div>

          <div className="order-info">
            <p>
              <strong>Payment:</strong>{" "}
              {order.payment_method}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {Number(order.grand_total).toFixed(2)}
            </p>
          </div>

          <table className="order-items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              className="stock-btn"
              onClick={() =>
                printReceipt(order.id)
              }
            >
              🖨 Reprint Receipt
            </button>

            {order.status !== "Cancelled" && (
              <button
                className="cancel-btn"
                onClick={() =>
                  cancelOrder(order.id)
                }
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}