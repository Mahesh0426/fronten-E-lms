import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.courseTitle),
    datasets: [
      {
        label: "Assignment Average",
        data: data.map((item) => item.assignmentAverage),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        stack: "Stack 0",
      },
      {
        label: "Quiz Average",
        data: data.map((item) => item.quizAverage),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        stack: "Stack 0",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Assignment and Quiz Averages by Course",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 25,
        title: {
          display: true,
          text: "Score",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StackedBarChart;
