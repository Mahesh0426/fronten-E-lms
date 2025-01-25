import {
  getEnrolledCourses,
  getRecommendedCourses,
} from "@/axios/student-course/myCourseAxios";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useLoading from "@/hooks/useLoading";
import { setStudentEnrolledCoursesList } from "@/redux/student-course/studentCourseSlice";
import { BookOpen, GraduationCap, Star, Watch } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyCoursePage = () => {
  const { user } = useSelector((state) => state.user);
  const { studentEnrolledCoursesList } = useSelector(
    (state) => state.studentCourse
  );

  const { isLoading, startLoading, stopLoading } = useLoading();
  const [recommendations, setRecommendations] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Reset the enrolled courses list on mount
  useEffect(() => {
    dispatch(setStudentEnrolledCoursesList([]));
  }, [dispatch]);

  //function to fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      startLoading();
      try {
        const response = await getRecommendedCourses(user?._id);

        if (response?.success === true) {
          setRecommendations(response.recommendations);
          return;
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        stopLoading();
      }
    };
    fetchRecommendations();
  }, [user?._id]);

  return (
    <div className="  p-4 dark:bg-gray-900 ">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">My Courses</h1>
      {isLoading ? (
        <PageLoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {studentEnrolledCoursesList &&
          studentEnrolledCoursesList.length > 0 ? (
            studentEnrolledCoursesList.map((course) => (
              <Card
                key={course._id}
                className="flex flex-col dark:bg-gray-800 dark:border-gray-700  "
              >
                <CardContent className="p-4 flex-grow">
                  <img
                    src={course?.courseImage}
                    alt={course?.title}
                    className="h-45 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="font-bold mb-1 dark:text-white">
                    {course?.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2 dark:text-white">
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
            <Card className="col-span-full p-8 text-center dark:bg-gray-800 dark:border-gray-700 ">
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
      <h1 className=" mt-10 text-2xl font-bold mb-4  dark:text-white">
        Recommended Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((course) => (
            <Card
              key={course._id}
              className="flex flex-col dark:bg-gray-800 dark:border-gray-700 "
            >
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.image}
                  alt={course?.title}
                  className="h-45 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1 dark:text-white">
                  {course?.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2 dark:text-white">
                  Created by - {course?.instructorName}
                </p>

                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < course.averageRating ? "gold" : "none"}
                      stroke={
                        i < course.averageRating ? "gold" : "currentColor"
                      }
                    />
                  ))}
                </div>

                <p className="font-bold text-[16px]">${course?.pricing}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => navigate(`/course/details/${course._id}`)}
                  className="flex-1 sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="dark:text-white">no recommendation available </p>
        )}
      </div>
    </div>
  );
};

export default MyCoursePage;
