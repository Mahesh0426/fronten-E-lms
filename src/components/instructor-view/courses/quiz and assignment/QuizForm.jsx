import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createQuizAction } from "@/redux/instructor-quiz and Assignment/quizAction";

const initialQuizFormData = [
  {
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
];

const QuizForm = ({ onClose }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [quizFormData, setQuizFormData] = useState(initialQuizFormData);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const instructorId = user?._id;
  const instructorName = user?.userName;
  const { courses } = useSelector((state) => state.course) || {};

  // Extracting course fields for the dropdown
  const filteredCourses = courses?.map((course) => ({
    courseId: course._id,
    courseName: course.title,
  }));

  // Handler for changes in course dropdown
  const handleCourseChange = (courseId) => {
    const selectedCourse = filteredCourses.find(
      (course) => course.courseId === courseId
    );
    setSelectedCourseId(courseId);
    setSelectedCourseName(selectedCourse ? selectedCourse.courseName : "");
  };

  // Function to add a new question to the form
  const addQuestion = () => {
    const newQuestion = {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    };

    setQuizFormData([...quizFormData, newQuestion]);
  };

  // Handlers for changes in form fields
  const handleQuestionChange = (index, value) => {
    const newQuizFormData = [...quizFormData];
    newQuizFormData[index].questionText = value;
    setQuizFormData(newQuizFormData);
  };

  // Handlers for changes when option change
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuizFormData = [...quizFormData];
    newQuizFormData[questionIndex].options[optionIndex] = value;
    setQuizFormData(newQuizFormData);
  };

  //handlers for  correct answer
  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuizFormData = [...quizFormData];
    newQuizFormData[questionIndex].correctAnswer = value;
    setQuizFormData(newQuizFormData);
  };

  // Submit handler for creating the quiz
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!quizTitle && !selectedCourseId) {
      return toast.error("Please provide all required fields !!");
    }

    // Prepare the quiz data object
    const quizData = {
      title: quizTitle,
      questions: quizFormData,
      instructorId,
      instructorName,
      courseId: selectedCourseId,
      courseName: selectedCourseName,
      status: "Draft",
      totalQuestions: quizFormData.length,
      totalMarks: quizFormData.length * marks,
    };

    try {
      // Dispatch the action to create the quiz
      dispatch(createQuizAction(quizData));
      setQuizFormData(initialQuizFormData);
      onClose();
    } catch (error) {
      toast.error("Failed to create quiz");
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <Input
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Quiz Title"
          className="flex-1"
        />
        <Input
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Marks each question"
          type="number"
          className="w-50 "
        />
      </div>
      {/* dropdown for course selection  */}
      <Select onValueChange={(value) => handleCourseChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Course" />
        </SelectTrigger>
        <SelectContent>
          {filteredCourses?.map((course) => (
            <SelectItem key={course.courseId} value={course.courseId}>
              {course.courseName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* form for quiz input */}
      <div className="max-h-96 overflow-y-auto border p-4 rounded">
        {quizFormData.map((question, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 border rounded">
            <Textarea
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder={`Question ${qIndex + 1}`}
              className="mb-2"
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="mb-2">
                <Input
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  placeholder={`Option ${oIndex + 1}`}
                />
              </div>
            ))}
            <Input
              value={question.correctAnswer}
              onChange={(e) =>
                handleCorrectAnswerChange(qIndex, e.target.value)
              }
              placeholder="Correct Answer"
              className="mt-2"
            />
          </div>
        ))}
      </div>

      <Button type="button" onClick={addQuestion} className="mb-4">
        Add Question
      </Button>
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Quiz</Button>
      </div>
    </form>
  );
};

export default QuizForm;
