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

  const role = (user?.role || "Admin").toLowerCase();

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
      roles: ["admin", "cashier", "manager"],
    },
    {
      name: "Billing",
      icon: <FaCashRegister />,
      path: "/billing",
      roles: ["admin", "cashier"],
    },
    {
      name: "Kitchen",
      icon: <FaHamburger />,
      path: "/kitchen",
      roles: ["admin", "kitchen"],
    },
    {
      name: "Orders",
      icon: <FaClipboardList />,
      path: "/orders",
      roles: ["admin", "cashier", "manager"],
    },
    {
      name: "Inventory",
      icon: <FaBoxes />,
      path: "/inventory",
      roles: ["admin", "manager"],
    },
    {
      name: "Menu",
      icon: <FaUtensils />,
      path: "/menu",
      roles: ["admin"],
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
      roles: ["admin", "manager"],
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
      roles: ["admin"],
    },
    {
      name: "Staff",
      icon: <FaBoxes />,
      path: "/employees",
      roles: ["admin", "manager"],
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
            .filter(item => item.roles.includes(role))
            .map(item => (

              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <span className="icon">
                  {item.icon}
                </span>

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