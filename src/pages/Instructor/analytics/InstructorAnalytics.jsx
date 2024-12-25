import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAverageScoresByInstructorId } from "@/axios/marks/marksAxios";
import GradeBarChart from "@/components/instructor-view/charts/barchartGrade";
import ProgressPieChart from "@/components/instructor-view/charts/PieChartProgressStats";
import StackedBarChart from "@/components/instructor-view/charts/StackedbarChart";
import { useSelector } from "react-redux";
import useLoading from "@/hooks/useLoading";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";

const Analytics = () => {
  const { user } = useSelector((state) => state.user);
  const instructorId = user?._id;
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [averageScores, setAverageScores] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();

        const response = await fetchAverageScoresByInstructorId(instructorId);
        console.log("response ", response);

        setAverageScores(response.data);
        if (response.data.length > 0) {
          setSelectedCourse(response.data[0].courseId);
        }
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();

        console.log("Loading stopped.");
      }
    };

    fetchData();
  }, [instructorId]);

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
  };

  const selectedCourseData =
    averageScores.find((course) => course.courseId === selectedCourse) ||
    averageScores[0];

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <PageLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <div className="mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full h-64">
          <GradeBarChart selectedCourseData={selectedCourseData} />
        </div>
        <div className="w-full h-64">
          <ProgressPieChart data={selectedCourseData} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Courses Comparison</h2>
        <div className="w-full h-96">
          <StackedBarChart data={averageScores} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
