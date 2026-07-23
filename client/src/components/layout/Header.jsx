import {
  FaBell,
  FaUserCircle,
  FaClock,
  FaBars,
} from "react-icons/fa";

import "./Header.css";

export default function Header({ openSidebar }) {

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="header">

      <div className="header-left">

        <button
          className="menu-btn"
          onClick={openSidebar}
        >
          <FaBars />
        </button>

        <div>
          <h1>🍔 Appetite POS</h1>
          <p>{date}</p>
        </div>

      </div>

      <div className="right">

        <div className="clock">
          <FaClock />
          <span>{time}</span>
        </div>

        <FaBell size={20} />

        <div className="user">

          <FaUserCircle size={38} />

          <div>
            <b>Admin</b>
            <p>Restaurant Owner</p>
          </div>

        </div>

      </div>

    </div>
  );
}