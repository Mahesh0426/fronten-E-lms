import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressPieChart = ({ data }) => {
  // Check if data and progressStats exist
  if (!data || !data.progressStats) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [
          data.progressStats.completed || 0,
          data.progressStats.inProgress || 0,
          data.progressStats.notStarted || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Course Progress: ${data.courseTitle || "Unknown Course"}`,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default ProgressPieChart;
