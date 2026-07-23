import {
  FaTachometerAlt,
  FaCashRegister,
  FaUtensils,
  FaClipboardList,
  FaBoxes,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaHamburger,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ open, closeSidebar }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
      roles: ["Admin", "Cashier", "Manager"],
    },
    {
      name: "Billing",
      icon: <FaCashRegister />,
      path: "/billing",
      roles: ["Admin", "Cashier"],
    },
    {
      name: "Kitchen",
      icon: <FaHamburger />,
      path: "/kitchen",
      roles: ["Admin", "Kitchen"],
    },
    {
      name: "Orders",
      icon: <FaClipboardList />,
      path: "/orders",
      roles: ["Admin", "Cashier", "Manager"],
    },
    {
      name: "Inventory",
      icon: <FaBoxes />,
      path: "/inventory",
      roles: ["Admin", "Manager"],
    },
    {
      name: "Menu",
      icon: <FaUtensils />,
      path: "/menu",
      roles: ["Admin"],
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
      roles: ["Admin", "Manager"],
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
      roles: ["Admin"],
    },
    {
      name: "Staff",
      icon: <FaBoxes />,
      path: "/employees",
      roles: ["Admin", "Manager"],
    },
  ];

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside className={`sidebar ${open ? "open" : ""}`}>

        <div className="logo">

          <div>
            <h2>🍔 Appetite</h2>
            <small>Restaurant POS</small>
          </div>

          <button
            className="close-sidebar"
            onClick={closeSidebar}
          >
            ✕
          </button>

        </div>

        <nav>
          {menuItems
            .filter((item) =>
              item.roles
                .map((r) => r.toLowerCase())
                .includes((user?.role || "").toLowerCase())
            )
            .map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
        </nav>

        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </aside>
    </>
  );
}