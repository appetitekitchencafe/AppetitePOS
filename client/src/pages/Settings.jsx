import { useState } from "react";
import "./Settings.css";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Settings() {
  const [settings, setSettings] = useState({
    restaurantName: "Appetite Kitchen",
    phone: "8499908891",
    address: "",
    gst: "",
    currency: "₹",
    tax: 5,
    serviceCharge: 0,
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <DashboardLayout>
      <div style={{ padding: 30 }}>
        <h1>⚙ Restaurant Settings</h1>

        <div
          style={{
            background: "#fff",
            padding: 25,
            borderRadius: 10,
            marginTop: 20,
            maxWidth: 700,
            boxShadow: "0 4px 12px rgba(0,0,0,.08)"
          }}
        >
          <label>Restaurant Name</label>
          <input
            name="restaurantName"
            value={settings.restaurantName}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
          />

          <label>Address</label>
          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
          />

          <label>GST Number</label>
          <input
            name="gst"
            value={settings.gst}
            onChange={handleChange}
          />

          <label>Currency</label>
          <select
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          >
            <option>₹</option>
            <option>$</option>
            <option>€</option>
          </select>

          <label>GST (%)</label>
          <input
            type="number"
            name="tax"
            value={settings.tax}
            onChange={handleChange}
          />

          <label>Service Charge (%)</label>
          <input
            type="number"
            name="serviceCharge"
            value={settings.serviceCharge}
            onChange={handleChange}
          />

          <button
            onClick={saveSettings}
            style={{
              marginTop: 20,
              background: "#ff6b00",
              color: "#fff",
              border: "none",
              padding: "12px 25px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}