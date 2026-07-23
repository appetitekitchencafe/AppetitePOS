import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">

      <Sidebar
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="main">

        <Header
          openSidebar={() => setSidebarOpen(true)}
        />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}