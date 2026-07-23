import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function SalesChart({ weeklySales = [] }) {

  const data = {
    labels: weeklySales.map((d) =>
      new Date(d.day).toLocaleDateString()
    ),

    datasets: [
      {
        label: "Revenue",

        data: weeklySales.map((d) => Number(d.total)),

        borderWidth: 3,

        tension: 0.4,

        fill: true,
      },
    ],
  };

  return (
    <div className="chart-card">

      <h2>📈 Last 7 Days Revenue</h2>

      {weeklySales.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No sales data available.</p>
      )}

    </div>
  );
}