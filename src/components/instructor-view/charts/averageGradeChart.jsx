// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { fetchAverageScoresByInstructorId } from "@/axios/marks/marksAxios";
// import StackedBarChart from "./StackedbarChart";
// import ProgressPieChart from "./PieChartProgressStats";
// import GradeBarChart from "./barchartGrade";

// const AverageGradeChart = ({ instructorId }) => {
//   const [averageScores, setAverageScores] = useState([]);
//   console.log(averageScores);

//   const [selectedCourse, setSelectedCourse] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetchAverageScoresByInstructorId(instructorId);
//       console.log("response ", response);

//       setAverageScores(response.data);
//       if (response.data.length > 0) {
//         setSelectedCourse(response.data[0].courseId);
//       }
//     };
//     fetchData();
//   }, [instructorId]);

//   const handleCourseSelect = (courseId) => {
//     setSelectedCourse(courseId);
//   };

//   const selectedCourseData =
//     averageScores.find((course) => course.courseId === selectedCourse) ||
//     averageScores[0];

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <Select value={selectedCourse} onValueChange={handleCourseSelect}>
//           <SelectTrigger className="w-[280px]">
//             <SelectValue placeholder="Select a course" />
//           </SelectTrigger>
//           <SelectContent>
//             {averageScores.map((course) => (
//               <SelectItem key={course.courseId} value={course.courseId}>
//                 {course.courseTitle}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="w-full h-64">
//           <GradeBarChart selectedCourseData={selectedCourseData} />
//         </div>
//         <div className="w-full h-64">
//           <ProgressPieChart data={selectedCourseData} />
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">All Courses Comparison</h2>
//         <div className="w-full h-96">
//           <StackedBarChart data={averageScores} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AverageGradeChart;
