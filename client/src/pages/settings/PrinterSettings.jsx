export default function PrinterSettings() {
  return (
    <div className="settings-card">

      <h2>🖨 Printer Settings</h2>

      <div className="grid-2">

        <div>
          <label>Kitchen Printer</label>

          <select>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>

        </div>

        <div>
          <label>Receipt Printer</label>

          <select>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>

        </div>

      </div>

    </div>
  );
}