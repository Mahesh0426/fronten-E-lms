import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ revenueData }) => {
  // Prepare chart data
  const labels = revenueData.map((item) => item.orderDate);
  const data = revenueData.map((item) => item.totalRevenue);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Revenue",
        data: data,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="-mt-8" style={{ height: "400px", width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
