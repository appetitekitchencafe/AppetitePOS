import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";
import "../styles/reports.css";

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalSales: 0,
    averageBill: 0,
  });

  const [topItems, setTopItems] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/reports", {
        params: {
          startDate,
          endDate,
        },
      });

      console.log("Reports API:", res.data);

      if (res.data.success) {
        setSummary(
          res.data.summary || {
            totalOrders: 0,
            totalSales: 0,
            averageBill: 0,
          }
        );

        setTopItems(res.data.topItems || []);
        setPayments(res.data.payments || []);
      } else {
        setError("Failed to load report.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load reports.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="reports-page">

        <h1 className="page-title">📊 Reports & Analytics</h1>

        <div className="report-filters">

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={loadReport}>
            Search
          </button>

        </div>

        {loading && <h3>Loading reports...</h3>}

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="dashboard-cards">

              <div className="card blue">
                <h2>{summary.totalOrders}</h2>
                <p>Total Orders</p>
              </div>

              <div className="card green">
                <h2>
                  ₹
                  {Number(summary.totalSales).toFixed(2)}
                </h2>
                <p>Total Sales</p>
              </div>

              <div className="card orange">
                <h2>
                  ₹
                  {Number(summary.averageBill).toFixed(2)}
                </h2>
                <p>Average Bill</p>
              </div>

            </div>

            <div className="report-section">

              <h2>🏆 Top Selling Items</h2>

              {topItems.length === 0 ? (
                <p>No sales found.</p>
              ) : (
                <table className="recent-table">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Sold</th>
                    </tr>
                  </thead>

                  <tbody>

                    {topItems.map((item, index) => (
                      <tr key={item.name}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.sold}</td>
                      </tr>
                    ))}

                  </tbody>

                </table>
              )}

            </div>

            <div className="report-section">

              <h2>💳 Payment Breakdown</h2>

              {payments.length === 0 ? (
                <p>No payment data.</p>
              ) : (
                <table className="recent-table">

                  <thead>
                    <tr>
                      <th>Payment Method</th>
                      <th>Orders</th>
                    </tr>
                  </thead>

                  <tbody>

                    {payments.map((payment) => (
                      <tr key={payment.payment_method}>
                        <td>{payment.payment_method}</td>
                        <td>{payment.total}</td>
                      </tr>
                    ))}

                  </tbody>

                </table>
              )}

            </div>

          </>
        )}

      </div>
    </DashboardLayout>
  );
}