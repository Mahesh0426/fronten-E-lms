// import React from "react";

// const InstructorQuizesPage = () => {
//   return <h1>InstructorQuizesPage</h1>;
// };

// export default InstructorQuizesPage;
import React, { useState } from "react";
import ReactPlayer from "react-player";
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
import { PlusCircle, Edit, Trash2, Video, FileText } from "lucide-react";

const InstructorQuizesPage = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [newLecture, setNewLecture] = useState({ title: "", files: [] });

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
    if (newLecture.title && newLecture.files.length > 0) {
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
      setNewLecture({ title: "", files: [] });
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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      setNewLecture((prev) => ({
        ...prev,
        files: [
          ...prev.files,
          { name: file.name, url: objectURL, type: file.type },
        ],
      }));
    });
  };

  const removeFile = (fileName) => {
    setNewLecture((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.name !== fileName),
    }));
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
                          className="flex flex-col border p-2 rounded"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold">
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
                          {lecture.files.map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className="flex items-center mt-1"
                            >
                              {file.type.startsWith("video/") ? (
                                <>
                                  <Video className="h-4 w-4 mr-2" />
                                  <ReactPlayer
                                    url={file.url}
                                    controls={true}
                                    width="200px"
                                    height="auto"
                                  />
                                </>
                              ) : (
                                <>
                                  <FileText className="h-4 w-4 mr-2" />
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    {file.name}
                                  </a>
                                </>
                              )}
                            </div>
                          ))}
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
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="mb-2"
                      />
                      <div className="mb-2">
                        {newLecture.files.map((file, index) => (
                          <div key={index} className="flex items-center mt-1">
                            <span>{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() => handleAddLecture(course.id)}
                        disabled={
                          !newLecture.title || newLecture.files.length === 0
                        }
                      >
                        Add Lecture
                      </Button>
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

export default InstructorQuizesPage;
