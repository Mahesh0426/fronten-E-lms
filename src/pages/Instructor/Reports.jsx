import React, { useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const PerformanceReports = () => {
  const [selectedStudent, setSelectedStudent] = useState("All");
  const [selectedTimeRange, setSelectedTimeRange] = useState("This Semester");

  // Dummy data for course completion rates
  const completionRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Completion Rate (%)",
        data: [65, 70, 75, 80, 85, 90],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Dummy data for assignment scores
  const assignmentScoresData = {
    labels: [
      "Assignment 1",
      "Assignment 2",
      "Assignment 3",
      "Assignment 4",
      "Final Project",
    ],
    datasets: [
      {
        label: "Score",
        data: [85, 78, 90, 88, 92],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Dummy data for engagement levels
  const engagementData = {
    labels: ["Forum Posts", "Resource Access", "Video Views", "Quiz Attempts"],
    datasets: [
      {
        data: [30, 50, 15, 5],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Dummy student progress data
  const studentProgress = [
    { course: "Mathematics 101", completed: "80%", grade: "A-" },
    { course: "Physics 202", completed: "65%", grade: "B+" },
    { course: "Computer Science 301", completed: "90%", grade: "A" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Performance Reports</h1>

      <div className="mb-4 flex space-x-4">
        <div>
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
        <div>
          <label htmlFor="timeRangeSelect" className="mr-2">
            Time Range:
          </label>
          <select
            id="timeRangeSelect"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="border rounded p-1"
          >
            <option>This Semester</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Course Completion Rates
          </h2>
          <div className="h-64">
            <Line
              data={completionRateData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Assignment Scores</h2>
          <div className="h-64">
            <Bar
              data={assignmentScoresData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Engagement Levels</h2>
          <div className="h-64 flex justify-center items-center">
            <div className="w-full max-w-[250px]">
              <Doughnut
                data={engagementData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Student Progress</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Course</th>
                <th className="text-left">Completed</th>
                <th className="text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentProgress.map((course, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2">{course.course}</td>
                  <td className="py-2">{course.completed}</td>
                  <td className="py-2">{course.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Early Alert System</h2>
        <div className="flex space-x-4">
          <div className="flex-1 p-4 bg-green-100 rounded">
            <h3 className="font-semibold text-green-800">On Track</h3>
            <p>Student is performing well in most areas.</p>
          </div>
          <div className="flex-1 p-4 bg-yellow-100 rounded">
            <h3 className="font-semibold text-yellow-800">Needs Attention</h3>
            <p>Assignment submission rate has decreased.</p>
          </div>
          <div className="flex-1 p-4 bg-red-100 rounded">
            <h3 className="font-semibold text-red-800">
              Immediate Action Required
            </h3>
            <p>Low engagement in online discussions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
