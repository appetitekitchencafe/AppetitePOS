export default function RestaurantSettings() {
  return (
    <div className="settings-card">

      <h2>🏪 Restaurant Information</h2>

      <div className="grid-2">

        <div>
          <label>Restaurant Name</label>
          <input placeholder="Appetite Kitchen" />
        </div>

        <div>
          <label>Owner Name</label>
          <input placeholder="Owner" />
        </div>

        <div>
          <label>Phone</label>
          <input placeholder="8499908891" />
        </div>

        <div>
          <label>Email</label>
          <input placeholder="example@email.com" />
        </div>

      </div>

      <label>Restaurant Address</label>

      <textarea
        rows="3"
        placeholder="Restaurant Address"
      />

    </div>
  );
}