import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function PaymentChart({ paymentBreakdown = [] }) {

  const data = {
    labels: paymentBreakdown.map(
      (p) => p.payment_method
    ),

    datasets: [
      {
        data: paymentBreakdown.map(
          (p) => Number(p.total)
        ),
      },
    ],
  };

  return (
    <div className="chart-card">

      <h2>💳 Payment Methods</h2>

      {paymentBreakdown.length > 0 ? (
        <Doughnut data={data} />
      ) : (
        <p>No payment data available.</p>
      )}

    </div>
  );
}