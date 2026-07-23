export default function PurchaseTable({
  items,
  setItems,
}) {
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.purchase_price,
    0
  );

  return (
    <div className="purchase-table">

      <table className="recent-table">

        <thead>

          <tr>

            <th>#</th>

            <th>Item</th>

            <th>Qty</th>

            <th>Price</th>

            <th>Total</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {items.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                }}
              >
                No Items Added
              </td>
            </tr>

          ) : (

            items.map((item, index) => (

              <tr key={index}>

                <td>{index + 1}</td>

                <td>{item.item_name}</td>

                <td>{item.quantity}</td>

                <td>
                  ₹
                  {Number(
                    item.purchase_price
                  ).toFixed(2)}
                </td>

                <td>
                  ₹
                  {(
                    item.quantity *
                    item.purchase_price
                  ).toFixed(2)}
                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeItem(index)
                    }
                  >
                    Remove
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

        <tfoot>

          <tr>

            <th
              colSpan="4"
              style={{
                textAlign: "right",
              }}
            >
              Grand Total
            </th>

            <th>
              ₹{grandTotal.toFixed(2)}
            </th>

            <th></th>

          </tr>

        </tfoot>

      </table>

    </div>
  );
}