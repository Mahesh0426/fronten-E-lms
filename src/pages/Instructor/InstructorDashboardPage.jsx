// import React from "react";

// const InstructorDashboardPage = () => {
//   return <h1>InstructorDashboardPage</h1>;
// };

// export default InstructorDashboardPage;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, Edit, Trash2, FileText, Video, Image } from "lucide-react";

const InstructorDashboardPage = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [newLecture, setNewLecture] = useState({ title: "", videoUrl: "" });

  const handleAddCourse = () => {
    setCourses([...courses, { ...newCourse, id: Date.now(), lectures: [] }]);
    setNewCourse({ title: "", description: "" });
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id);
    setNewCourse({ title: course.title, description: course.description });
  };

  const handleUpdateCourse = () => {
    setCourses(
      courses.map((course) =>
        course.id === editingCourseId ? { ...course, ...newCourse } : course
      )
    );
    setEditingCourseId(null);
    setNewCourse({ title: "", description: "" });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleAddLecture = (courseId) => {
    if (newLecture.title && newLecture.videoUrl) {
      setCourses(
        courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                lectures: [
                  ...course.lectures,
                  { ...newLecture, id: Date.now() },
                ],
              }
            : course
        )
      );
      setNewLecture({ title: "", videoUrl: "" });
    }
  };

  const handleDeleteLecture = (courseId, lectureId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              lectures: course.lectures.filter(
                (lecture) => lecture.id !== lectureId
              ),
            }
          : course
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {editingCourseId ? "Edit Course" : "Create New Course"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
            className="mb-4"
          />
          <Textarea
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            className="mb-4"
          />
          <Button
            onClick={editingCourseId ? handleUpdateCourse : handleAddCourse}
          >
            {editingCourseId ? "Update Course" : "Add Course"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {course.title}
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{course.description}</p>

              <Accordion type="single" collapsible className="mb-4">
                <AccordionItem value="lectures">
                  <AccordionTrigger>
                    Lectures ({course.lectures.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {course.lectures.map((lecture, index) => (
                        <div
                          key={lecture.id}
                          className="flex justify-between items-center"
                        >
                          <span>
                            {index + 1}. {lecture.title}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteLecture(course.id, lecture.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Input
                        placeholder="Lecture Title"
                        value={newLecture.title}
                        onChange={(e) =>
                          setNewLecture({
                            ...newLecture,
                            title: e.target.value,
                          })
                        }
                        className="mb-2"
                      />
                      <Input
                        placeholder="Video URL"
                        value={newLecture.videoUrl}
                        onChange={(e) =>
                          setNewLecture({
                            ...newLecture,
                            videoUrl: e.target.value,
                          })
                        }
                        className="mb-2"
                      />
                      <Button
                        onClick={() => handleAddLecture(course.id)}
                        disabled={course.lectures.length >= 12}
                      >
                        Add Lecture
                      </Button>
                      {course.lectures.length >= 12 && (
                        <p className="text-sm text-red-500 mt-2">
                          Maximum of 12 lectures reached.
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
