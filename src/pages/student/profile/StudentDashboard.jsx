// import { fetchMarksByStudentIdAction } from "@/redux/grade/gradeAction";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const studentPerformance = [
//   {
//     course: "CSS Mastery",
//     progress: 80,
//     quizGrade: { obtained: 4, total: 6 },
//     assignmentScore: { obtained: 20, total: 23 },
//   },
//   {
//     course: "Html Fundamental",
//     progress: 60,
//     quizGrade: { obtained: 10, total: 10 },
//     assignmentScore: { obtained: 10, total: 20 },
//   },
// ];

// const StudentDashboard = () => {
//   const dispatch = useDispatch();
//   const { studentMarks } = useSelector((state) => state.grade);
//   console.log("studentMarks", studentMarks);
//   const { user } = useSelector((state) => state.user);
//   const studentId = user?._id;

//   useEffect(() => {
//     if (studentId) {
//       dispatch(fetchMarksByStudentIdAction(studentId));
//     }
//   }, [dispatch, studentId]);

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">My Performance</h1>

//       {studentPerformance.map((course) => (
//         <div
//           key={course.course}
//           className="border p-4 rounded shadow-lg flex flex-col md:flex-row items-center gap-6"
//         >
//           {/* Course Name and Progress */}
//           <div className="w-full md:w-1/4">
//             <h2 className="text-xl font-semibold">{course.course}</h2>
//             <div className="mt-4">
//               <h3 className="font-medium">Course Progress</h3>
//               <div className="w-full bg-gray-200 rounded-full h-4">
//                 <div
//                   className="bg-green-500 h-4 rounded-full"
//                   style={{ width: `${course.progress}%` }}
//                 ></div>
//               </div>
//               <p className="mt-2 text-sm">{course.progress}% completed</p>
//             </div>
//           </div>

//           {/* Quiz Grade */}
//           <div className="w-full md:w-1/3 text-center">
//             <h3 className="font-medium mb-2">Quiz Grade</h3>
//             <div className="text-3xl font-bold text-green-500">
//               {course.quizGrade.obtained}/{course.quizGrade.total}
//             </div>
//           </div>

//           {/* Assignment Score */}
//           <div className="w-full md:w-1/3 text-center">
//             <h3 className="font-medium mb-2">Assignment Score</h3>
//             <div className="text-3xl font-bold text-blue-500">
//               {course.assignmentScore.obtained}/{course.assignmentScore.total}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentDashboard;

import { fetchMarksByStudentIdAction } from "@/redux/grade/gradeAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { studentMarks, loading } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.user);
  const studentId = user?._id;

  useEffect(() => {
    if (studentId) {
      dispatch(fetchMarksByStudentIdAction(studentId));
    }
  }, [dispatch, studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-3xl  font-bold text-indigo-600 ">
          Welcome back, {user?.userName} !
        </h1>
        <p className=" text-sm text-gray-500">
          Here's an overview of your learning progress
        </p>
      </div>

      {studentMarks.map((course, index) => (
        <div
          key={index}
          className="border p-4 rounded shadow-lg flex flex-col md:flex-row items-center gap-6"
        >
          {/* Course Name */}
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold">{course.course}</h2>
            <h3 className="font-medium">Course Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${course?.progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm">
              {course?.progress || "N/A"}% completed
            </p>
          </div>

          {/* Quiz Grade */}
          <div className="w-full md:w-1/3 text-center">
            <h3 className="font-medium mb-2">Quiz Grade</h3>
            <div className="text-3xl font-bold text-green-500">
              {course.quizScore}/{course.quizTotalMarks || "N/A"}
            </div>
          </div>

          {/* Assignment Score */}
          <div className="w-full md:w-1/3 text-center">
            <h3 className="font-medium mb-2">Assignment Score</h3>
            <div className="text-3xl font-bold text-blue-500">
              {course.assignmentScore}/{course.assignmentMaxScore || "N/A"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
