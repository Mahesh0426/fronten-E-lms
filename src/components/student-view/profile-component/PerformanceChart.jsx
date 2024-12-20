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

const PerformanceChart = ({ studentMarks }) => {
  const data = {
    labels: studentMarks.map((mark) => mark.course),
    datasets: [
      {
        label: "Assignment Score",
        data: studentMarks.map((mark) => mark.assignmentScore),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Quiz Score",
        data: studentMarks.map((mark) => mark.quizScore),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
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
        text: "Student Performance by Course",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Courses",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PerformanceChart;
