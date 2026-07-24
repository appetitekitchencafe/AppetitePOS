import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/onlineCart.css";

const IMAGE_URL =
  "https://appetitepos-production.up.railway.app/uploads/";

export default function OnlineCart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("onlineCart")) || []
  );

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState("Takeaway");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const gst = subtotal * 0.05;

  const total = subtotal + gst;

  function updateCart(updated) {
    setCart(updated);
    localStorage.setItem(
      "onlineCart",
      JSON.stringify(updated)
    );
  }

  function increase(id) {
    updateCart(
      cart.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );
  }

  function decrease(id) {
    updateCart(
      cart
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  }

  function remove(id) {
    updateCart(cart.filter((i) => i.id !== id));
  }

  async function placeOrder() {
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await api.post("/online/order", {
        customerName,
        phone,
        orderType,
        cart,
      });

      localStorage.removeItem("onlineCart");

      navigate(`/order-success/${res.data.orderId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  }
    return (
    <div className="online-cart">

      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <h3>Your cart is empty.</h3>

          <button onClick={() => navigate("/order")}>
            Back to Menu
          </button>

        </div>

      ) : (

        <>

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={
                    item.image
                      ? `${IMAGE_URL}${item.image}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={item.name}
                />

                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p>₹{item.price}</p>

                  <small>
                    Total ₹
                    {(item.price * item.qty).toFixed(2)}
                  </small>

                </div>

                <div className="qty-box">

                  <button
                    onClick={() => decrease(item.id)}
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increase(item.id)}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => remove(item.id)}
                >
                  🗑
                </button>

              </div>

            ))}

          </div>

          <div className="checkout-box">

            <h2>Customer Details</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <select
              value={orderType}
              onChange={(e) =>
                setOrderType(e.target.value)
              }
            >
              <option value="Takeaway">
                Takeaway
              </option>

              <option value="Dine In">
                Dine In
              </option>
            </select>

            <div className="summary">

              <div>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div>
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>

              <div className="grand-total">
                <strong>Total</strong>
                <strong>₹{total.toFixed(2)}</strong>
              </div>

            </div>

            <button
              className="place-order-btn"
              onClick={placeOrder}
            >
              ✅ Place Order
            </button>

          </div>

        </>

      )}

    </div>
  );
}