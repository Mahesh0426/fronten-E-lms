import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const InstructorCoursePage = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold"> All courses</CardTitle>
        <Button
          // onClick={() => {
          //   setCurrentEditedCourseId(null);
          //   setCourseLandingFormData(courseLandingInitialFormData);
          //   setCourseCurriculumFormData(courseCurriculumInitialFormData);
          //   navigate("/instructor/create-new-course");
          // }}
          className="flex p-6 justify-center rounded-md bg-indigo-600   text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create new course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
              {listOfCourse && listOfCourse.length > 0
                ? listOfCourse.map((course, index) => (
                    <TableRow key={course?._id || index}>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>{course?.pricing}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody> */}
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.eWUjOCd3NX0YumGQSDNQAwHaEK&pid=Api&P=0&h=180"
                    alt="react Js"
                    className="h-15 w-16 rounded"
                  />
                </TableCell>
                <TableCell>ReactJS</TableCell>
                <TableCell>0</TableCell>
                <TableCell>100$</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    {" "}
                    <Edit className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCoursePage;
