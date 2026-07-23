import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SalesChart({ weeklySales = [] }) {
  const labels =
    weeklySales.length > 0
      ? weeklySales.map((item) =>
          new Date(item.day).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        )
      : ["No Data"];

  const sales =
    weeklySales.length > 0
      ? weeklySales.map((item) => Number(item.total))
      : [0];

  const data = {
    labels,
    datasets: [
      {
        label: "Sales (₹)",
        data: sales,
        borderColor: "#1976d2",
        backgroundColor: "rgba(25,118,210,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}