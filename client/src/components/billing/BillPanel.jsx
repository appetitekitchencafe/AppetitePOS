export default function BillPanel({
  bill,
  subtotal,
  gst,
  grandTotal,
  paymentMethod,
  setPaymentMethod,
  increaseQty,
  decreaseQty,
  completeOrder,
  clearBill,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">

      <h2 className="text-2xl font-bold mb-6">
        Current Bill
      </h2>

      <div className="space-y-4">

        {bill.map((item) => (

          <div
            key={item.id}
            className="flex justify-between items-center"
          >

            <div>
              <h4 className="font-semibold">
                {item.name}
              </h4>

              <small>
                ₹{item.price}
              </small>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() => decreaseQty(item.id)}
                className="w-8 h-8 rounded bg-gray-200"
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="w-8 h-8 rounded bg-green-600 text-white"
              >
                +
              </button>

            </div>

          </div>

        ))}

      </div>

      <hr className="my-5" />

      <div className="space-y-2">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <strong>₹{subtotal.toFixed(2)}</strong>
        </div>

        <div className="flex justify-between">
          <span>GST</span>
          <strong>₹{gst.toFixed(2)}</strong>
        </div>

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>

      </div>

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
        className="w-full mt-6 border rounded-xl p-3"
      >
        <option>Cash</option>
        <option>UPI</option>
        <option>Card</option>
      </select>

      <button
        onClick={completeOrder}
        className="
          w-full
          mt-4
          bg-green-600
          hover:bg-green-700
          text-white
          rounded-xl
          py-3
          font-semibold
        "
      >
        Complete Order
      </button>

      <button
        onClick={clearBill}
        className="
          w-full
          mt-3
          bg-red-500
          hover:bg-red-600
          text-white
          rounded-xl
          py-3
        "
      >
        Clear Bill
      </button>

    </div>
  );
}