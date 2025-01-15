import React, { useEffect, useState } from "react";
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
import {
  createQuizAction,
  editQuizAction,
} from "@/redux/instructor-quiz and Assignment/quizAction";

const initialQuizFormData = [
  {
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
];

const QuizForm = ({ onClose, edittedQuizId }) => {
  const dispatch = useDispatch();

  // State for quiz metadata
  const [quizTitle, setQuizTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [quizFormData, setQuizFormData] = useState(initialQuizFormData);

  // Redux selectors
  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course) || {};
  const { quizes } = useSelector((state) => state.quiz);

  const instructorId = user?._id;
  const instructorName = user?.userName;

  //  extracting For course dropdown
  const filteredCourses = courses?.map(({ _id, title }) => ({
    courseId: _id,
    courseName: title,
  }));

  // Populate form for editing
  const populateFormForEditing = () => {
    if (edittedQuizId && quizes?.length > 0) {
      const quizToEdit = quizes.find((quiz) => quiz._id === edittedQuizId);
      if (quizToEdit) {
        setQuizTitle(quizToEdit.title || "");
        setMarks(quizToEdit.totalMarks / quizToEdit.totalQuestions || "");
        setQuizFormData(quizToEdit.questions || initialQuizFormData);
        setSelectedCourseId(quizToEdit.courseId || "");
        setSelectedCourseName(quizToEdit.courseName || "");
      }
    } else {
      resetForm();
    }
  };

  // mount populateFormFormEditing when id chanages
  useEffect(() => {
    populateFormForEditing();
  }, [edittedQuizId, quizes]);

  const resetForm = () => {
    setQuizTitle("");
    setMarks("");
    setQuizFormData(initialQuizFormData);
    setSelectedCourseId("");
    setSelectedCourseName("");
  };

  //handle course change
  const handleCourseChange = (courseId) => {
    const selectedCourse = filteredCourses.find(
      (course) => course.courseId === courseId
    );
    setSelectedCourseId(courseId);
    setSelectedCourseName(selectedCourse?.courseName || "");
  };

  // Change the question text
  const handleQuestionChange = (qIndex, value) => {
    setQuizFormData((prevData) => {
      const updated = [...prevData];
      updated[qIndex] = { ...updated[qIndex], questionText: value };
      return updated;
    });
  };

  // Change a specific option
  const handleOptionChange = (qIndex, oIndex, value) => {
    setQuizFormData((prevData) => {
      const updated = [...prevData];
      updated[qIndex] = {
        ...updated[qIndex],
        options: updated[qIndex].options.map((opt, idx) =>
          idx === oIndex ? value : opt
        ),
      };
      return updated;
    });
  };

  // Change the correct answer
  const handleCorrectAnswerChange = (qIndex, value) => {
    setQuizFormData((prevData) => {
      const updated = [...prevData];
      updated[qIndex] = { ...updated[qIndex], correctAnswer: value };
      return updated;
    });
  };

  // Add a new question
  const addQuestion = () => {
    setQuizFormData([
      ...quizFormData,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  // ========== Submit ==========
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!quizTitle || !marks || !selectedCourseId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const quizData = {
      title: quizTitle,
      questions: quizFormData,
      instructorId,
      instructorName,
      courseId: selectedCourseId,
      courseName: selectedCourseName,
      status: edittedQuizId ? "Published" : "Draft",
      totalQuestions: quizFormData.length,
      totalMarks: quizFormData.length * marks,
    };

    try {
      if (edittedQuizId) {
        dispatch(editQuizAction(edittedQuizId, quizData));
      } else {
        dispatch(createQuizAction(quizData));
        resetForm();
      }
      onClose();
    } catch (error) {
      toast.error("Failed to create or update quiz.");
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
          placeholder="Marks per question"
          type="number"
          className="w-41"
        />
      </div>

      <Select
        value={selectedCourseId}
        onValueChange={(value) => handleCourseChange(value)}
      >
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

      {/* Questions */}
      <div className="max-h-96 overflow-y-auto border p-4 rounded">
        {quizFormData.map((question, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 border rounded">
            <Textarea
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder={`Question ${
                qIndex + 1
              }: Write directly, no numbering needed`}
              className="mb-2"
            />
            {question.options.map((option, oIndex) => (
              <Input
                key={oIndex}
                value={option}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
                placeholder={`option ${String.fromCharCode(65 + oIndex)}`}
                className="mb-2"
              />
            ))}

            <Input
              value={question.correctAnswer}
              onChange={(e) =>
                handleCorrectAnswerChange(qIndex, e.target.value)
              }
              placeholder="Enter exact correct answer"
              className="mt-2"
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={addQuestion}
        className="mb-4 w-full sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
      >
        Add Question
      </Button>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          type="submit"
        >
          {edittedQuizId ? "Update Quiz" : "Create Quiz"}
        </Button>
      </div>
    </form>
  );
};

export default QuizForm;
