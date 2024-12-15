import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const ActivityLog = () => {
  const [selectedStudent, setSelectedStudent] = useState("All");

  // Dummy data for student overview
  const studentOverview = {
    "Total time spent": "45h 30m",
    "Number of logins": 78,
    "Forum contributions": 23,
    "Submitted assignments": 12,
    "Viewed lectures": 56,
  };

  // Dummy data for engagement chart
  const engagementData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Logins",
        data: [20, 25, 18, 30, 28],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Dummy data for completion status
  const completionData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  // Dummy data for activity timeline
  const activityTimeline = [
    { time: "2024-12-15 10:30", activity: "Logged in" },
    { time: "2024-12-15 10:45", activity: "Viewed Lecture 5" },
    { time: "2024-12-15 11:15", activity: "Submitted Assignment 3" },
    { time: "2024-12-15 11:30", activity: "Posted in Discussion Forum" },
    { time: "2024-12-15 12:00", activity: "Logged out" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Activity Log</h1>

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
          <h2 className="text-xl font-semibold mb-4">Student Overview</h2>
          <ul>
            {Object.entries(studentOverview).map(([key, value]) => (
              <li key={key} className="mb-2">
                <span className="font-medium">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Course Engagement</h2>
          <div className="h-64">
            <Line
              data={engagementData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
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

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Activity Timeline</h2>
          <ul className="space-y-2">
            {activityTimeline.map((item, index) => (
              <li key={index} className="flex">
                <span className="font-medium mr-2">{item.time}:</span>
                <span>{item.activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
