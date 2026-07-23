export default function TopSelling({ topItems = [] }) {
  return (
    <div className="top-items-card">
      <h2>🏆 Top Selling Items</h2>

      {topItems.length === 0 ? (
        <p>No sales yet.</p>
      ) : (
        <table className="top-items-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Sold</th>
            </tr>
          </thead>

          <tbody>
            {topItems.map((item, index) => (
              <tr key={item.name}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}