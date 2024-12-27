import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";
import { fetchAllStudentCoursesAction } from "@/redux/student-course/studentCourseAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeaturesCoursesPage = ({ search }) => {
  const { studentCourses } = useSelector((state) => state.studentCourse);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  search courses based on search input
  const searchCourses = Array.isArray(studentCourses)
    ? studentCourses.filter((course) =>
        course.title?.toLowerCase().includes(search?.toLowerCase() || "")
      )
    : [];

  // useEffect to fetch courses
  useEffect(() => {
    if (!studentCourses || studentCourses.length === 0) {
      dispatch(fetchAllStudentCoursesAction());
    }
  }, [dispatch, studentCourses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {studentCourses && studentCourses.length > 0 ? (
        studentCourses.length > 0 ? (
          searchCourses.map((courseItem) => (
            <div
              onClick={() => navigate(`/course/details/${courseItem?._id}`)}
              key={courseItem?._id}
              className="border rounded-lg overflow-hidden shadow cursor-pointer transition-all duration-300 ease-in hover:shadow-lg hover:scale-105"
            >
              <img
                src={courseItem?.image}
                alt="thumbnail"
                width={300}
                height={150}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Created by{" "}
                  <span className="font-bold">
                    {courseItem?.instructorName.charAt(0).toUpperCase() +
                      courseItem?.instructorName.slice(1)}
                  </span>
                </p>
                <p className="font-bold text-[16px]">${courseItem?.pricing}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full">
            No courses match your search criteria.
          </p>
        )
      ) : (
        <PageLoadingSpinner />
      )}
    </div>
  );
};

export default FeaturesCoursesPage;
