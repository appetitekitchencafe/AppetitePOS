import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">

      <Sidebar
        open={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      <div className="main">

        <Header
          openSidebar={openSidebar}
        />

        <main
          className="content"
          onClick={() => {
            if (window.innerWidth <= 768 && sidebarOpen) {
              closeSidebar();
            }
          }}
        >
          {children}
        </main>

      </div>

    </div>
  );
}