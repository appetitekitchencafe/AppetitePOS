import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "green" }}>✅ Order Placed!</h1>

        <p>Your order has been received.</p>

        <p>Thank you for ordering with Appetite Kitchen.</p>

        <Link
          to="/order"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "12px 24px",
            background: "#ff6b00",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
          }}
        >
          Back to Menu
        </Link>
      </div>
    </div>
  );
}