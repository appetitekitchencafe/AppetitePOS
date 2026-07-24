import React, { forwardRef } from "react";

const Receipt = forwardRef(
  ({ bill, total, paymentMethod, orderNumber }, ref) => {
    const gst = total * 0.05;
    const grandTotal = total + gst;

    const today = new Date();

    return (
      <div
        ref={ref}
        style={{
          width: "300px",
          padding: "15px",
          fontFamily: "monospace",
          color: "#000",
          background: "#fff",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>🍔 Appetite Kitchen</h2>

          <p style={{ margin: "5px 0" }}>
            Restaurant POS System
          </p>

          <p style={{ margin: "5px 0" }}>
            Hyderabad, Telangana
          </p>

          <p style={{ margin: "5px 0" }}>
            +91 8499908891
          </p>

          <hr />
        </div>

        <p>
          <strong>Order :</strong> {orderNumber}
        </p>

        <p>
          <strong>Date :</strong>{" "}
          {today.toLocaleDateString()}
        </p>

        <p>
          <strong>Time :</strong>{" "}
          {today.toLocaleTimeString()}
        </p>

        <hr />

        <table
          style={{
            width: "100%",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr>
              <th align="left">Item</th>
              <th>Qty</th>
              <th align="right">Total</th>
            </tr>
          </thead>

          <tbody>
            {bill.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td align="center">
                  {item.qty}
                </td>

                <td align="right">
                  ₹
                  {(
                    item.price * item.qty
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <table
          style={{
            width: "100%",
            fontSize: "14px",
          }}
        >
          <tbody>
            <tr>
              <td>Subtotal</td>

              <td align="right">
                ₹{total.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td>GST (5%)</td>

              <td align="right">
                ₹{gst.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Grand Total</strong>
              </td>

              <td align="right">
                <strong>
                  ₹{grandTotal.toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>

        <hr />

        <p>
          <strong>Payment :</strong>{" "}
          {paymentMethod}
        </p>

        <p>
          <strong>Loyalty Earned :</strong>{" "}
          {Math.floor(grandTotal / 10)} Points ⭐
        </p>

        <hr />

        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              marginBottom: "5px",
            }}
          >
            ❤️ Thank You ❤️
          </h3>

          <p>Visit Again!</p>
        </div>
      </div>
    );
  }
);

export default Receipt;