import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, XCircle } from "lucide-react";

const courses = [
  { id: "1", name: "React Basics" },
  { id: "2", name: "Node.js Fundamentals" },
  { id: "3", name: "Advanced Python" },
];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("quizzes");
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseChange = (event) => setSelectedCourse(event.target.value);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Quizzes & Assignments
        </h1>
        <Button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-green-500 text-white"
        >
          <Plus className="h-5 w-5" />
          Add New
        </Button>
      </div>

      {/* Course Selector */}
      <div className="mb-6">
        <label
          htmlFor="course"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Course
        </label>
        <select
          id="course"
          value={selectedCourse}
          onChange={handleCourseChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("quizzes")}
          className={`px-4 py-2 rounded-t-md ${
            activeTab === "quizzes"
              ? "bg-white text-blue-500 font-semibold"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          Quizzes
        </button>
        <button
          onClick={() => setActiveTab("assignments")}
          className={`px-4 py-2 rounded-t-md ${
            activeTab === "assignments"
              ? "bg-white text-blue-500 font-semibold"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          Assignments
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Add New {activeTab === "quizzes" ? "Quiz" : "Assignment"}
              </h2>
              <button onClick={handleCloseModal}>
                <XCircle className="h-6 w-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {activeTab === "quizzes" && (
              <CreateQuiz
                courseId={selectedCourse}
                closeModal={handleCloseModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CreateQuiz = ({ courseId, closeModal }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = parseInt(value);
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ courseId, quizTitle, questions });
    // Send the data to the backend
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Quiz Title"
        className="mb-4"
      />
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 border rounded">
          <Textarea
            value={question.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder={`Question ${qIndex + 1}`}
            className="mb-2"
          />
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <Input
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
                placeholder={`Option ${oIndex + 1}`}
                className="mr-2"
              />
              <input
                type="radio"
                name={`correctAnswer${qIndex}`}
                value={oIndex}
                checked={question.correctAnswer === oIndex}
                onChange={(e) =>
                  handleCorrectAnswerChange(qIndex, e.target.value)
                }
              />
              <label className="ml-1">Correct</label>
            </div>
          ))}
        </div>
      ))}
      <Button type="button" onClick={addQuestion} className="mb-4">
        Add Question
      </Button>
      <Button type="submit">Create Quiz</Button>
    </form>
  );
};

export default Sidebar;
