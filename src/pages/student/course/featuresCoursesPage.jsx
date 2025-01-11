import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";
import { fetchAllStudentCoursesAction } from "@/redux/student-course/studentCourseAction";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Star } from "lucide-react";

const FeaturesCoursesPage = ({ search }) => {
  const { studentCourses } = useSelector((state) => state.studentCourse);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter courses based on search input
  const searchCourses = Array.isArray(studentCourses)
    ? studentCourses.filter((course) =>
        course.title?.toLowerCase().includes(search?.toLowerCase() || "")
      )
    : [];

  // Calculate pagination values
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = searchCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(searchCourses.length / itemsPerPage);

  // Fetch courses if not available
  useEffect(() => {
    if (!studentCourses || studentCourses.length === 0) {
      dispatch(fetchAllStudentCoursesAction());
    }
  }, [dispatch, studentCourses]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-8 ">
        {studentCourses && studentCourses.length > 0 ? (
          currentCourses.length > 0 ? (
            currentCourses.map((courseItem) => (
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
                  {courseItem.averageRating > 0 && (
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < courseItem.averageRating ? "gold" : "none"}
                          stroke={
                            i < courseItem.averageRating
                              ? "gold"
                              : "currentColor"
                          }
                        />
                      ))}
                    </div>
                  )}
                  <p className="font-bold text-[16px]">
                    ${courseItem?.pricing}
                  </p>
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

      {/* pagination */}
      {searchCourses.length > itemsPerPage && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default FeaturesCoursesPage;
