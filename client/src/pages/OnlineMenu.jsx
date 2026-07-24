import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/onlineMenu.css";

const IMAGE_URL =
  "https://appetitepos-production.up.railway.app/uploads/";

export default function OnlineMenu() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("onlineCart")) || []
  );

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      const res = await api.get("/online/menu");

      if (res.data.success) {
        setMenu(res.data.menu);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(menu.map((item) => item.category)),
    ];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const searchMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" ||
        item.category === category;

      return searchMatch && categoryMatch;
    });
  }, [menu, search, category]);

  function addToCart(item) {
    const existing = cart.find((i) => i.id === item.id);

    let updated;

    if (existing) {
      updated = cart.map((i) =>
        i.id === item.id
          ? {
              ...i,
              qty: i.qty + 1,
            }
          : i
      );
    } else {
      updated = [
        ...cart,
        {
          ...item,
          qty: 1,
        },
      ];
    }

    setCart(updated);

    localStorage.setItem(
      "onlineCart",
      JSON.stringify(updated)
    );
  }

  function openCart() {
    navigate("/cart");
  }
    return (
    <div className="online-menu">

      <header className="online-header">

        <h1>🍽 Appetite Kitchen</h1>

        <p>Order Fresh Food Online</p>

      </header>

      <div className="search-section">

        <input
          type="text"
          placeholder="Search your favorite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="category-list">

        {categories.map((cat) => (

          <button
            key={cat}
            className={
              category === cat
                ? "active-category"
                : ""
            }
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>

        ))}

      </div>

      {loading ? (

        <div className="loading">

          Loading Menu...

        </div>

      ) : (

        <div className="food-grid">

          {filteredMenu.length === 0 && (

            <div className="empty">

              No Items Found

            </div>

          )}

          {filteredMenu.map((item) => (

            <div
              className="food-card"
              key={item.id}
            >

              <img
                src={
                  item.image
                    ? `${IMAGE_URL}${item.image}`
                    : "https://via.placeholder.com/300x220?text=No+Image"
                }
                alt={item.name}
              />

              <div className="food-info">

                <span
                  className={
                    item.available
                      ? "available"
                      : "unavailable"
                  }
                >
                  {item.available
                    ? "Available"
                    : "Out of Stock"}
                </span>

                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <div className="food-footer">

                  <h2>₹{item.price}</h2>

                  <button
                    disabled={!item.available}
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      <button
        className="floating-cart"
        onClick={openCart}
      >

        🛒 Cart ({cart.reduce((a, b) => a + b.qty, 0)})

      </button>

    </div>
  );

}