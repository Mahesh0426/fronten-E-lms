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

const GradeBarChart = ({ selectedCourseData }) => {
  const chartData = {
    labels: ["Assignment Average", "Quiz Average"],
    datasets: [
      {
        label: selectedCourseData?.courseTitle || "No Course Selected",
        data: [
          selectedCourseData?.assignmentAverage,
          selectedCourseData?.quizAverage,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)"],
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
        text: "Average Grades for Selected Course",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 25,
        title: {
          display: true,
          text: "Score",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default GradeBarChart;
