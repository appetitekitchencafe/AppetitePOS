import "./Settings.css";

import RestaurantSettings from "./RestaurantSettings";
import BillingSettings from "./BillingSettings";
import ExpenseSettings from "./ExpenseSettings";
import PrinterSettings from "./PrinterSettings";
import UserSettings from "./UserSettings";

export default function Settings() {
  return (
    <div className="settings-page">

      <div className="settings-header">
        <h1>⚙️ Appetite POS Settings</h1>
        <p>
          Configure your restaurant, billing,
          printers, users and expenses.
        </p>
      </div>

      <RestaurantSettings />

      <BillingSettings />

      <ExpenseSettings />

      <PrinterSettings />

      <UserSettings />

    </div>
  );
}