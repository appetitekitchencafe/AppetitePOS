import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";
import "../styles/menu.css";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    available: true,
  });

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

  const deleteItem = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!ok) return;

    try {
      await api.delete(`/menu/${id}`);

      alert("Item deleted successfully.");

      loadMenu();
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  const saveItem = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append(
  "available",
  form.available ? 1 : 0
);

      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        await api.put(`/menu/${editingId}`, formData);
      } else {
        await api.post("/menu", formData);
      }

      alert(
        editingId
          ? "Menu updated successfully."
          : "Menu added successfully."
      );

      setShowForm(false);
      setEditingId(null);
      setImage(null);

      setForm({
        name: "",
        category: "",
        price: "",
        available: true,
      });

      loadMenu();

    } catch (err) {
      console.error(err);

      console.log(err.response);

      console.log(err.response?.data);

      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to save menu item."
      );
    }
  };

  return (
    <DashboardLayout>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>🍽 Menu Management</h2>

        <button
          onClick={() => {
            setEditingId(null);

            setImage(null);

            setForm({
              name: "",
              category: "",
              price: "",
              available: true,
            });

            setShowForm(true);
          }}
        >
          ➕ Add Item
        </button>

      </div>
            {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 25,
              borderRadius: 12,
              width: 420,
            }}
          >
            <h2>
              {editingId ? "Edit Menu Item" : "Add Menu Item"}
            </h2>

            <input
              type="text"
              placeholder="Item Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 10,
              }}
            />

            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 10,
              }}
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 10,
              }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              style={{
                width: "100%",
                marginBottom: 15,
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: 15,
              }}
            >
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) =>
                  setForm({
                    ...form,
                    available: e.target.checked,
                  })
                }
              />{" "}
              Available
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setImage(null);
                }}
              >
                Cancel
              </button>

              <button onClick={saveItem}>
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <input
  type="text"
  placeholder="🔍 Search menu..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  }}
/>

<div className="menu-grid">
  {menu
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((item) => (
      <div className="menu-card" key={item.id}>

        <img
          src={
            item.image
              ? `http://localhost:5000/uploads/${item.image}`
              : "https://via.placeholder.com/250x180?text=No+Image"
          }
          alt={item.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "12px",
          }}
        />

        <h3>{item.name}</h3>

        <p>{item.category}</p>

        <h4>₹{item.price}</h4>

        <button
          onClick={() => {
            setEditingId(item.id);

            setForm({
              name: item.name,
              category: item.category,
              price: item.price,
              available: item.available,
            });

            setImage(null);

            setShowForm(true);
          }}
        >
          ✏ Edit
        </button>

        <button
          onClick={() => deleteItem(item.id)}
          style={{
            background: "#dc2626",
            color: "#fff",
            marginTop: 10,
          }}
        >
          🗑 Delete
        </button>

      </div>
    ))}
</div>

</DashboardLayout>
);
}