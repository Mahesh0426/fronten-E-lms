import React, { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const StudentAnalytics = () => {
  const [selectedStudent, setSelectedStudent] = useState("All");

  // Dummy data for student performance
  const performanceData = {
    labels: [
      "Assignment 1",
      "Quiz 1",
      "Assignment 2",
      "Quiz 2",
      "Final Project",
    ],
    datasets: [
      {
        label: "Scores",
        data: [85, 78, 90, 82, 88],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Dummy data for activity logs
  const activityData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Hours Active",
        data: [10, 12, 8, 15, 11],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  // Dummy data for quiz performance
  const quizData = {
    labels: ["Excellent", "Good", "Average", "Poor"],
    datasets: [
      {
        data: [30, 50, 15, 5],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  // Dummy activity log entries
  const activityLogs = [
    { date: "2024-12-10", activity: "Submitted Assignment 1" },
    { date: "2024-12-11", activity: "Completed Quiz 1" },
    { date: "2024-12-12", activity: "Viewed Lecture 3" },
    { date: "2024-12-13", activity: "Posted in Discussion Forum" },
    { date: "2024-12-14", activity: "Started Assignment 2" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Analytics Dashboard</h1>

      <div className="mb-4">
        <label htmlFor="studentSelect" className="mr-2">
          Select Student:
        </label>
        <select
          id="studentSelect"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="border rounded p-1"
        >
          <option>All</option>
          <option>John Doe</option>
          <option>Jane Smith</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="h-64">
            <Bar
              data={performanceData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Activity Trends</h2>
          <div className="h-64">
            <Line
              data={activityData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Quiz Performance Distribution
          </h2>
          <div className="h-64 flex justify-center items-center">
            <div className="w-full max-w-[250px]">
              <Doughnut
                data={quizData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity Logs</h2>
          <ul className="space-y-2">
            {activityLogs.map((log, index) => (
              <li key={index} className="flex">
                <span className="font-medium mr-2">{log.date}:</span>
                <span>{log.activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
