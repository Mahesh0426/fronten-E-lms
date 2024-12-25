import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const Setting = () => {
  // Dummy data for student performance
  const performanceData = {
    labels: ["Assignment 1", "Quiz 1", "Midterm", "Assignment 2", "Final Exam"],
    datasets: [
      {
        label: "Average Score",
        data: [85, 78, 82, 88, 90],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Dummy data for course engagement
  const engagementData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Active Students",
        data: [50, 55, 48, 60, 58],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  // Dummy data for course completion
  const completionData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  return (
    <div className="analytics-container p-4">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="chart-container bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Student Performance</h2>
          <div className="h-64 overflow-x-auto">
            <div className="w-full min-w-[300px]">
              <Bar
                data={performanceData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        <div className="chart-container bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Course Engagement</h2>
          <div className="h-64 overflow-x-auto">
            <div className="w-full min-w-[300px]">
              <Line
                data={engagementData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        <div className="chart-container bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Course Completion Status
          </h2>
          <div className="h-64 flex justify-center items-center">
            <div className="w-full max-w-[250px]">
              <Pie
                data={completionData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
