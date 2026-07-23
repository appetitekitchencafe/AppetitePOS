import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "../components/Receipt";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";
import "../styles/billing.css";

export default function Billing() {

  const [menu, setMenu] = useState([]);
  const [bill, setBill] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);

  const [orderNumber, setOrderNumber] = useState("");

  const receiptRef = useRef();

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const res = await api.get("/menu");
      setMenu(res.data.menu);
    } catch (err) {
      console.error(err);
    }
  };

  const categories = [
    "All",
    ...new Set(menu.map((item) => item.category)),
  ];

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addItem = (item) => {

    const existing = bill.find(
      (i) => i.id === item.id
    );

    if (existing) {

      setBill(
        bill.map((i) =>
          i.id === item.id
            ? {
                ...i,
                qty: i.qty + 1,
              }
            : i
        )
      );

    } else {

      setBill([
        ...bill,
        {
          ...item,
          qty: 1,
        },
      ]);

    }

  };

  const increaseQty = (id) => {

    setBill(
      bill.map((i) =>
        i.id === id
          ? {
              ...i,
              qty: i.qty + 1,
            }
          : i
      )
    );

  };

  const decreaseQty = (id) => {

    setBill(
      bill
        .map((i) =>
          i.id === id
            ? {
                ...i,
                qty: i.qty - 1,
              }
            : i
        )
        .filter((i) => i.qty > 0)
    );

  };

  const removeItem = (id) => {
    setBill(
      bill.filter((i) => i.id !== id)
    );
  };

  const subtotal = bill.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  const gst = subtotal * 0.05;

  const grandTotal = subtotal + gst;

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: "Receipt",
  });

  const searchCustomer = async () => {

    if (!phone.trim()) return;

    try {

      const res = await api.get(
        `/customers/phone/${phone}`
      );

      if (res.data.success) {

        setCustomer(res.data.customer);

      } else {

        const create = window.confirm(
          "Customer not found.\nCreate new customer?"
        );

        if (!create) return;

        const name = prompt("Customer Name");

        if (!name) return;

        await api.post("/customers", {
          name,
          phone,
          email: "",
          birthday: null,
          address: "",
        });

        const again = await api.get(
          `/customers/phone/${phone}`
        );

        setCustomer(again.data.customer);

      }

    } catch (err) {
      console.error(err);
    }

  };
    const completeOrder = async () => {

    if (bill.length === 0) {
      alert("Bill is empty.");
      return;
    }

    try {

      const res = await api.post("/orders", {
        cart: bill,
        paymentMethod,
        customerId: customer?.id || null,
      });

      setOrderNumber(res.data.orderNumber);

      setTimeout(() => {
        handlePrint();
        setBill([]);
      }, 300);

    } catch (err) {
      console.error(err);
      alert("Failed to save order.");
    }

  };

  return (

    <DashboardLayout>

      <div className="billing-page">

        <div className="menu-side">

          <h2>🍽 Menu</h2>

          <input
            className="search-box"
            placeholder="Search food..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="category-buttons">

            {categories.map((cat) => (

              <button
                key={cat}
                className={
                  selectedCategory === cat
                    ? "active-category"
                    : ""
                }
                onClick={() =>
                  setSelectedCategory(cat)
                }
              >
                {cat}
              </button>

            ))}

          </div>

          <div className="menu-grid">

            {filteredMenu.map((item) => (
  <div className="food-card" key={item.id}>

  <img
    className="food-image"
    src={
      item.image
        ? `http://192.168.0.2:5000/uploads/${item.image}`
        : "https://via.placeholder.com/300x220?text=No+Image"
    }
    alt={item.name}
  />

  <div className="food-info">

    <span
      className={
        item.available
          ? "badge available"
          : "badge unavailable"
      }
    >
      {item.available ? "Available" : "Out of Stock"}
    </span>

    <h3>{item.name}</h3>

    <p>{item.category}</p>

    <div className="food-bottom">

      <h4>₹{item.price}</h4>

      <button onClick={() => addItem(item)}>
        + Add
      </button>

    </div>

  </div>

</div>
))}

          </div>

        </div>

        <div className="bill-side">

          <h2>🧾 Current Bill</h2>

          <div
            style={{
              background: "#f8fafc",
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >

            <input
              className="search-box"
              placeholder="Customer Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <button
              style={{
                width: "100%",
                marginTop: 10,
              }}
              onClick={searchCustomer}
            >
              Search Customer
            </button>

            {customer && (

              <div
                style={{
                  marginTop: 15,
                }}
              >

                <strong>
                  {customer.name}
                </strong>

                <p>{customer.phone}</p>

                <p>
                  ⭐ Loyalty Points :
                  {" "}
                  {customer.loyalty_points}
                </p>

              </div>

            )}

          </div>
                    {bill.length === 0 && (
            <p>No items added.</p>
          )}

          {bill.map((item) => (

            <div
              className="bill-item"
              key={item.id}
            >

              <img
                src={
                  item.image
                    ? `http://appetitepos-production.up.railway.app/uploads/${item.image}`
                    : "https://via.placeholder.com/70"
                }
                alt={item.name}
                className="bill-image"
              />

              <div className="bill-details">

                <strong>{item.name}</strong>

                <p>₹{item.price}</p>

                <small>
                  Total : ₹
                  {(item.price * item.qty).toFixed(2)}
                </small>

              </div>

              <div className="qty-controls">

                <button
                  onClick={() =>
                    decreaseQty(item.id)
                  }
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    increaseQty(item.id)
                  }
                >
                  +
                </button>

              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                ❌
              </button>

            </div>

          ))}

          <hr />

          <div className="summary-row">

            <span>Subtotal</span>

            <span>
              ₹{subtotal.toFixed(2)}
            </span>

          </div>

          <div className="summary-row">

            <span>GST (5%)</span>

            <span>
              ₹{gst.toFixed(2)}
            </span>

          </div>

          <div className="summary-row total">

            <span>Total</span>

            <span>
              ₹{grandTotal.toFixed(2)}
            </span>

          </div>

          <select
            className="payment-select"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
          </select>

          <button
            className="complete-btn"
            onClick={completeOrder}
          >
            Complete Order
          </button>

        </div>

      </div>
            <div style={{ display: "none" }}>
        <Receipt
          ref={receiptRef}
          bill={bill}
          total={subtotal}
          gst={gst}
          grandTotal={grandTotal}
          paymentMethod={paymentMethod}
          orderNumber={orderNumber}
          customer={customer}
        />
      </div>

    </DashboardLayout>

  );
}