import { getEnrolledCourses } from "@/axios/myCourseAxios";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useLoading from "@/hooks/useLoading";
import { setStudentEnrolledCoursesList } from "@/redux/student-course/studentCourseSlice";
import { BookOpen, GraduationCap, Watch } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyCoursePage = () => {
  const { user } = useSelector((state) => state.user);
  const { studentEnrolledCoursesList } = useSelector(
    (state) => state.studentCourse
  );

  const { isLoading, startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Reset the enrolled courses list on mount
  useEffect(() => {
    dispatch(setStudentEnrolledCoursesList([]));
  }, [dispatch]);

  //function to fetch the enrolled courses
  const fetchEnrolledCourses = async () => {
    startLoading();
    try {
      const response = await getEnrolledCourses(user?._id);
      if (response?.status === "success") {
        dispatch(setStudentEnrolledCoursesList(response?.data));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchEnrolledCourses();
    }
  }, [user?._id]);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      {isLoading ? (
        <PageLoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {studentEnrolledCoursesList &&
          studentEnrolledCoursesList.length > 0 ? (
            studentEnrolledCoursesList.map((course) => (
              <Card key={course._id} className="flex flex-col">
                <CardContent className="p-4 flex-grow">
                  <img
                    src={course?.courseImage}
                    alt={course?.title}
                    className="h-45 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="font-bold mb-1">{course?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Created by - {course?.instructorName}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() =>
                      navigate(`/course-progress/${course?.courseId}`)
                    }
                    className=" flex-1 sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                  >
                    <Watch className="mr-2 h-4 w-4" />
                    Go to Course
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="col-span-full p-8 text-center">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="absolute -left-8 top-0">
                    <BookOpen className="w-8 h-8 text-muted-foreground/30 transform -rotate-12" />
                  </div>
                  <GraduationCap className="w-16 h-16 text-primary" />
                  <div className="absolute -right-8 top-4">
                    <BookOpen className="w-8 h-8 text-muted-foreground/30 transform rotate-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    No Courses Found
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Your learning journey awaits! Start by enrolling in a course
                    that interests you.
                  </p>
                </div>

                <Link to="/courses">
                  <Button
                    size="lg"
                    className=" flex-1 sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCoursePage;
