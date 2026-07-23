import { useEffect, useState } from "react";
import api from "../services/api";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardCards from "../components/dashboard/DashboardCards";
import SalesChart from "../components/dashboard/SalesChart";
import PaymentChart from "../components/dashboard/PaymentChart";
import TopSelling from "../components/dashboard/TopSelling";

import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    todaySales: 0,
    todayOrders: 0,
    averageBill: 0,
    totalMenu: 0,
    availableItems: 0,
    topItems: [],
    weeklySales: [],
    paymentBreakdown: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await api.get("/dashboard");

      setStats(res.data);
    } catch (err) {
      console.error("Dashboard Error:", err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading Dashboard...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <DashboardCards stats={stats} />

      <div className="charts">

        <div className="left-chart">
          <SalesChart weeklySales={stats.weeklySales} />
        </div>

        <div className="right-chart">
          <PaymentChart
            paymentBreakdown={stats.paymentBreakdown}
          />
        </div>

      </div>

      <TopSelling topItems={stats.topItems} />

    </DashboardLayout>
  );
}