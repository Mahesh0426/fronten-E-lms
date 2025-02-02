import { getCourseProgressHistory } from "@/axios/student-course/courseProgressAxios";
import { fetchMarksByStudentIdAction } from "@/redux/grade/gradeAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentDashboard = () => {
  const dispatch = useDispatch();

  //redux selector
  const { studentMarks, loading } = useSelector((state) => state.grade);
  const { user } = useSelector((state) => state.user);
  const studentId = user?._id;

  // local state management
  const [courseProgress, setCourseProgress] = useState([]);

  //fetch course progress percentage
  useEffect(() => {
    const fetchProgress = async () => {
      const response = await getCourseProgressHistory(studentId);
      setCourseProgress(response.data);
    };
    fetchProgress();
  }, [studentId]);

  // to fetch student marks when component mount
  useEffect(() => {
    if (studentId) {
      dispatch(fetchMarksByStudentIdAction(studentId));
    }
  }, [dispatch, studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-8 m-0 min-h-96">
      <div>
        <h1 className="text-3xl sm:text-3xl font-bold text-indigo-600 ">
          Welcome back, {user?.userName} !
        </h1>
        <p className=" text-sm text-gray-500 dark:text-white">
          Here's an overview of your learning progress
        </p>
      </div>

      {studentMarks.map((course, index) => {
        // Find the matching course progress
        const progress = courseProgress.find(
          (cp) => cp.title === course.course
        );

        const progressPercentage = progress ? progress.progressPercentage : 0;

        return (
          <div
            key={index}
            className="border p-4 rounded shadow-lg flex flex-col md:flex-row items-center gap-6"
          >
            {/* Course Name */}
            <div className="w-full md:w-1/4">
              <h2 className="text-xl font-semibold dark:text-white">
                {course.course}
              </h2>
              <h3 className="font-medium dark:text-white">Course Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full "
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm dark:text-white">
                {progressPercentage}% completed
              </p>
            </div>

            {/* Quiz Grade */}
            <div className="w-full md:w-1/3 text-center">
              <h3 className="font-medium mb-2 dark:text-white">Quiz Grade</h3>
              <div className="text-3xl font-bold text-green-500">
                {course.quizScore}/{course.quizTotalMarks || "N/A"}
              </div>
            </div>

            {/* Assignment Score */}
            <div className="w-full md:w-1/3 text-center">
              <h3 className="font-medium mb-2 dark:text-white">
                Assignment Score
              </h3>
              <div className="text-3xl font-bold text-blue-500">
                {course.assignmentScore}/{course.assignmentMaxScore || "N/A"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentDashboard;
