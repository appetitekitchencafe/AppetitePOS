import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import "../styles/kitchen.css";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
  try {
    const res = await api.get("/orders/kitchen");

    if (res.data.success) {
      setOrders(res.data.orders);
    }
  } catch (err) {
    console.error(err);
  }
};

const updateStatus = async (id, status) => {
  try {
    await api.put(`/orders/${id}/status`, {
      status,
    });

    loadOrders();
  } catch (err) {
    console.error(err);
    alert("Failed to update order status.");
  }
};

  useEffect(() => {
    loadOrders();

    const interval = setInterval(loadOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="kitchen-title">
        👨‍🍳 Kitchen Display
      </h1>

      <div className="kitchen-grid">
        {orders.map((order) => (
          <div className="kitchen-card" key={order.id}>

            <div className="kitchen-header">
              <h2>{order.order_number}</h2>

              <span
                className={`status ${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>
            </div>

            {order.items.map((item, index) => (
              <div
                className="kitchen-item"
                key={index}
              >
                🍔 {item.quantity} × {item.name}
              </div>
            ))}

            <div className="kitchen-buttons">

              <button
  className="start-btn"
  onClick={() =>
    updateStatus(order.id, "Preparing")
  }
>
  Preparing
</button>

              <button
  className="ready-btn"
  onClick={() =>
    updateStatus(order.id, "Ready")
  }
>
  Ready
</button>

            </div>

          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}