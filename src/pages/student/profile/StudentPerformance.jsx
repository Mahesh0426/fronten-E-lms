import React from "react";

const studentPerformance = [
  {
    course: "Mathematics",
    progress: 80,
    quizGrade: 85, // Single quiz grade
    assignmentScore: 75, // Single assignment score
  },
  {
    course: "Science",
    progress: 60,
    quizGrade: 78,
    assignmentScore: 70,
  },
];

const MyPerformancePage = ({ performanceData }) => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">My Performance</h1>

      {studentPerformance.map((course) => (
        <div
          key={course.course}
          className="border p-4 rounded shadow-lg flex flex-col md:flex-row items-center gap-6"
        >
          {/* Course Name and Progress */}
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold">{course.course}</h2>
            <div className="mt-4">
              <h3 className="font-medium">Course Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm">{course.progress}% completed</p>
            </div>
          </div>

          {/* Quiz Grade */}
          <div className="w-full md:w-1/3 text-center">
            <h3 className="font-medium mb-2">Quiz Grade</h3>
            <div className="text-3xl font-bold text-green-500">
              {course.quizGrade}%
            </div>
          </div>

          {/* Assignment Score */}
          <div className="w-full md:w-1/3 text-center">
            <h3 className="font-medium mb-2">Assignment Score</h3>
            <div className="text-3xl font-bold text-blue-500">
              {course.assignmentScore}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPerformancePage;
