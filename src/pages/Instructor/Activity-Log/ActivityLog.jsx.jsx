import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { fetchActivityLogByInstructorId } from "@/axios/marks/marksAxios";
import { Input } from "@/components/ui/input";
import useLoading from "@/hooks/useLoading";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";

const ActivityLogPage = () => {
  // Redux selector
  const { user } = useSelector((state) => state.user);
  const instructorId = user?._id;
  const { isLoading, startLoading, stopLoading } = useLoading();

  //state mananagement
  const [selectedCourse, setSelectedCourse] = useState("");
  const [activityLogs, setActivityLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch activityLog data on mount
  useEffect(() => {
    try {
      startLoading();
      const getActivityLogs = async () => {
        const response = await fetchActivityLogByInstructorId(instructorId);
        setActivityLogs(response.data);
        if (response.data.length > 0) {
          setSelectedCourse(response.data[0].courseId);
        }
      };
      getActivityLogs();
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  }, [instructorId]);

  //handle course chnage for filter
  const handleCourseChange = (value) => {
    setSelectedCourse(value);
  };

  //filter activity logs based on selected course
  const selectedCourseData = activityLogs.find(
    (course) => course.courseId === selectedCourse
  );

  //show loader when loading
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <PageLoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <h1 className="mb-3 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
        Activity Log
      </h1>

      {/* Search and Filter */}
      <div className=" mt-2 mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by student name.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2"
        />
        <Select onValueChange={handleCourseChange} value={selectedCourse}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {activityLogs.map((course) => (
              <SelectItem key={course.courseId} value={course.courseId}>
                {course.courseTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-160px)] p-4 bg-gray-50 rounded-lg shadow-md space-y-6">
        {selectedCourseData?.purchaseLogs
          .filter((student) =>
            student.userName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((student) => (
            <Card key={student.userId}>
              <CardHeader>
                <CardTitle>{student.userName} - Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Activity</th>
                      <th className="border p-2 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2">
                        {format(new Date(student.dateOfPurchase), "PPpp")}
                      </td>
                      <td className="border p-2">Course Enrolled</td>
                      <td className="border p-2 text-right">-</td>
                    </tr>
                    {selectedCourseData.assignmentLogs
                      .filter((log) => log.userId === student.userId)
                      .map((log, index) => (
                        <tr
                          key={`assignment-${index}`}
                          className="hover:bg-gray-50"
                        >
                          <td className="border p-2">
                            {format(new Date(log.submissionDate), "PPpp")}
                          </td>
                          <td className="border p-2">Assignment Submitted</td>
                          <td className="border p-2 text-right">{log.score}</td>
                        </tr>
                      ))}
                    {selectedCourseData.quizLogs
                      .filter((log) => log.userId === student.userId)
                      .map((log, index) => (
                        <tr key={`quiz-${index}`} className="hover:bg-gray-50">
                          <td className="border p-2">
                            {format(new Date(log.submittedAt), "PPpp")}
                          </td>
                          <td className="border p-2">Quiz Attempted</td>
                          <td className="border p-2 text-right">
                            {log.obtainedMarks}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="mt-4">
                  <p className="mt-2">
                    <strong>Course Status: </strong>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        student.courseProgress === "completed"
                          ? "bg-green-100 text-green-800"
                          : student.courseProgress === "inProgress"
                          ? "bg-yellow-100 text-yellow-800"
                          : student.courseProgress === "notStarted"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.courseProgress.charAt(0).toUpperCase() +
                        student.courseProgress.slice(1)}
                    </span>
                  </p>

                  <p>
                    <strong>Total Points:</strong>{" "}
                    {selectedCourseData.quizLogs
                      .filter((log) => log.userId === student.userId)
                      .reduce((sum, log) => sum + log.obtainedMarks, 0) +
                      selectedCourseData.assignmentLogs
                        .filter((log) => log.userId === student.userId)
                        .reduce((sum, log) => sum + log.score, 0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ActivityLogPage;
