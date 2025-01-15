import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  BookX,
  Edit,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseAction,
  fetchAllCoursesAction,
} from "@/redux/instructor-course/courseAction";
import {
  setCourseContentFormData,
  setCourseDetailsFormData,
  setCurrentEditedCourseId,
} from "@/redux/instructor-course/courseSlice";
import {
  initialCourseContentFormData,
  initialCourseDetailsFormData,
} from "@/config/formConfig";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const InstructorAllCoursePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course || {});
  const { user } = useSelector((state) => state.user);

  // State to manage the search input
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    // Dispatch action to get all courses
    if (user?._id) {
      dispatch(fetchAllCoursesAction(user?._id));
    }
  }, [dispatch, user?._id]);

  // Filter courses based on search input
  const filteredCourses = (courses || []).filter((course) =>
    course.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  //function to delete course
  const deleteCourse = (courseId) => {
    // const isPublished = currentStatus === "true" ? "false" : "true";
    try {
      dispatch(deleteCourseAction(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Card className="min-h-[650px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          All courses
        </CardTitle>
      </CardHeader>

      {/* search and create ne button */}
      <div className="px-6 pb-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-grow">
            <Input
              placeholder="Search courses..."
              className="w-full"
              prefix={<Search className="h-4 w-4 mr-2" />}
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </div>

          <Button
            onClick={() => {
              dispatch(setCurrentEditedCourseId(null));
              dispatch(setCourseContentFormData(initialCourseContentFormData));
              dispatch(setCourseDetailsFormData(initialCourseDetailsFormData));
              navigate("/instructor/create-new-course");
            }}
            className="w-full sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Create new course
          </Button>
        </div>
      </div>

      <CardContent>
        {courses && courses.length > 0 ? (
          <div>
            {filteredCourses.length > 0 ? (
              <div className="overflow-x-auto overflow-y-auto max-h-[calc(110vh-300px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">SN</TableHead>
                      <TableHead className="w-[150px]">Thumbnail</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredCourses.map((course, index) => (
                      <TableRow key={course?._id || index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={course?.image}
                            alt="courseImage"
                            className="h-20 w-25 rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {course?.title}
                        </TableCell>
                        <TableCell>{course?.students?.length}</TableCell>
                        <TableCell>
                          {course?.students?.length * course?.pricing}
                        </TableCell>
                        <TableCell className="flex justify-end mt-3 ">
                          {/* edit button */}
                          <div className="relative group">
                            <Button
                              onClick={() =>
                                navigate(
                                  `/instructor/edit-course/${course?._id}`
                                )
                              }
                              variant="ghost"
                              size="sm"
                              className="p-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              <Edit className="h-6 w-6" />
                            </Button>
                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-md h-8 w-40 shadow-lg">
                              Edit Course
                            </div>
                          </div>

                          {/* delete button */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="p-2 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                              >
                                <Trash2 className="h-6 w-6" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your course
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteCourse(course?._id)}
                                >
                                  Delete Account
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex justify-center items-center h-32 text-lg font-semibold text-gray-600 dark:text-gray-300">
                No courses found matching your search
              </div>
            )}
          </div>
        ) : (
          // for the first time if no course available
          <div className="min-h-96  flex justify-center   p-4">
            <Card className="max-w-2xl w-full  text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <BookX
                    className="w-24 h-24 text-neutral-300"
                    strokeWidth={1.4}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1">
                    <PlusCircle
                      className="w-8 h-8 text-primary"
                      strokeWidth={1.4}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="font-extrabold text-4xl bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                  No courses available at the moment
                </h1>
                <p className="text-neutral-500 text-lg">
                  Get started by creating your first course or check back later
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => {
                    dispatch(setCurrentEditedCourseId(null));
                    dispatch(
                      setCourseContentFormData(initialCourseContentFormData)
                    );
                    dispatch(
                      setCourseDetailsFormData(initialCourseDetailsFormData)
                    );
                    navigate("/instructor/create-new-course");
                  }}
                  size="lg"
                  className="font-medium"
                >
                  Create Course
                </Button>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstructorAllCoursePage;
