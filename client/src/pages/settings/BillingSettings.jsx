export default function BillingSettings() {
  return (
    <div className="settings-card">

      <h2>🧾 Billing Settings</h2>

      <div className="grid-2">

        <div>
          <label>Invoice Prefix</label>
          <input placeholder="APP-" />
        </div>

        <div>
          <label>GST %</label>
          <input placeholder="5" />
        </div>

        <div>
          <label>Service Charge %</label>
          <input placeholder="0" />
        </div>

        <div>
          <label>Currency</label>

          <select>
            <option>INR ₹</option>
            <option>USD $</option>
          </select>

        </div>

      </div>

    </div>
  );
}