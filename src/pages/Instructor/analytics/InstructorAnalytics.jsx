import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAverageScoresByInstructorId } from "@/axios/marks/marksAxios";
import ProgressPieChart from "@/components/instructor-view/charts/PieChartProgressStats";
import StackedBarChart from "@/components/instructor-view/charts/StackedbarChart";
import { useSelector } from "react-redux";
import useLoading from "@/hooks/useLoading";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";
import GradeBarChart from "@/components/instructor-view/charts/BarChartGrade";

const Analytics = () => {
  // Redux selector
  const { user } = useSelector((state) => state.user);
  const instructorId = user?._id;
  const { isLoading, startLoading, stopLoading } = useLoading();

  // state management
  const [averageScores, setAverageScores] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // fetch analytic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const response = await fetchAverageScoresByInstructorId(instructorId);
        setAverageScores(response.data);
        if (response.data.length > 0) {
          setSelectedCourse(response.data[0].courseId);
        }
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [instructorId]);

  // handle course selection
  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
  };

  //filter analytics data based on selected course
  const selectedCourseData =
    averageScores.find((course) => course.courseId === selectedCourse) ||
    averageScores[0];

  //show loader when loading
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <PageLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className=" mb-3 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Analytics Dashboard
        </h1>
        <Select value={selectedCourse} onValueChange={handleCourseSelect}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {averageScores.map((course) => (
              <SelectItem key={course.courseId} value={course.courseId}>
                {course.courseTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-160px)] p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Performance Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Student Performance</h2>
            <div className="h-64 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="w-full min-w-[300px]">
                <GradeBarChart selectedCourseData={selectedCourseData} />
              </div>
            </div>
          </div>

          {/* Progress Overview Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
            <div className="h-64 ml-8">
              <ProgressPieChart data={selectedCourseData} />
            </div>
          </div>
        </div>

        {/* All Courses Comparison Section */}
        <div className="flex justify-center items-center mt-10">
          <div className="bg-white rounded-lg shadow-md p-8 w-[1000px]">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              All Courses Comparison
            </h2>
            <div className="h-[500px] w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <StackedBarChart data={averageScores} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
