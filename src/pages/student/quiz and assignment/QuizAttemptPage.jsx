import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchQuizByIdAction,
  fetchSubmittedQuizByIdAction,
  submitQuizAction,
} from "@/redux/instructor-quiz and Assignment/quizAction";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";

const QuizAttemptPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { quiz } = location.state || {};
  const { user } = useSelector((state) => state.user);
  const { quizGradeDetails } = useSelector((state) => state.quiz);

  const [answers, setAnswers] = useState([]);

  const handleRadioChange = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const calculateQuizScore = () => {
    if (!quiz || !quiz.questions) return null;

    let correctAnswers = 0;
    const scoredQuestions = quiz.questions.map((question, index) => {
      const studentAnswer = answers[index];
      const isCorrect = studentAnswer === question.correctAnswer;

      if (isCorrect) {
        correctAnswers++;
      }

      return {
        questionText: question.questionText,
        studentAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    const totalMarks = quiz.totalMarks || quiz.questions.length;
    const marksPerQuestion = totalMarks / quiz.questions.length;
    const obtainedMarks = correctAnswers * marksPerQuestion;

    return {
      totalQuestions: quiz.questions.length,
      correctAnswers,
      totalMarks,
      obtainedMarks,
      scoredQuestions,
    };
  };

  //function to handle quiz submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const allQuestionsAnswered = answers.every(
      (answer) => answer !== null && answer !== undefined
    );

    if (!allQuestionsAnswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const result = calculateQuizScore();
    const quizPayload = {
      quizId: quiz?._id,
      studentId: user?._id,
      studentName: user?.userName,
      courseId: quiz.courseId,
      submissionStatus: "Completed",
      answers: quiz.questions.map((question, index) => ({
        questionText: question.questionText,
        studentAnswer: answers[index],
        correctAnswer: question.correctAnswer,
      })),
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      totalMarks: result.totalMarks,
      obtainedMarks: result.obtainedMarks,
    };

    try {
      dispatch(submitQuizAction(quizPayload));
      navigate(-1);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  //fetch quiz attempts form  when  component mounts
  useEffect(() => {
    if (quiz?.courseId) {
      dispatch(fetchQuizByIdAction(quiz.courseId));
    }
  }, [dispatch, quiz?.courseId]);

  // fetch submitted quiz results when compounent mounts
  useEffect(() => {
    if ((quiz?._id, user?._id)) {
      dispatch(fetchSubmittedQuizByIdAction(quiz?._id, user?._id));
    }
  }, [dispatch, quiz?._id, user?._id]);

  // set answers to null when quiz changes
  useEffect(() => {
    if (quiz && quiz.questions) {
      setAnswers(Array(quiz.questions.length).fill(null));
    }
  }, [quiz]);

  //show loading if no quiz
  if (!quiz && !quizGradeDetails) {
    return (
      <p>
        <PageLoadingSpinner />
      </p>
    );
  }

  return quizGradeDetails?._id &&
    quizGradeDetails.submissionStatus === "Completed" ? (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Result
        </h1>
        <p className="text-2xl font-bold text-green-600">
          Your final grade for this quiz is:{" "}
          {`${quizGradeDetails.obtainedMarks.toFixed(
            2
          )} / ${quizGradeDetails.totalMarks.toFixed(2)}`}{" "}
        </p>
        {/* table got grade */}
        <div className="w-full max-w-2xl mx-auto mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">status</TableCell>
                <TableCell>{quizGradeDetails.submissionStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">submission Date</TableCell>
                <TableCell>
                  {new Date(quizGradeDetails?.submittedAt).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total Questions</TableCell>
                <TableCell>{quizGradeDetails.totalQuestions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Correct Answers</TableCell>
                <TableCell>{quizGradeDetails.correctAnswers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total Marks</TableCell>
                <TableCell>{quizGradeDetails.totalMarks}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Final Grade</TableCell>
                <TableCell className="font-bold ">
                  {`${quizGradeDetails.obtainedMarks.toFixed(
                    2
                  )} out of  ${quizGradeDetails.totalMarks.toFixed(2)}`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* quiz details break down  */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Detailed Breakdown</h2>
          {quizGradeDetails.answers.map((answer, index) => (
            <div
              key={index}
              className={`p-4 mb-4 rounded ${
                answer.studentAnswer === answer.correctAnswer
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              <p className="font-semibold mb-2">
                <strong>Q{index + 1}:</strong>{" "}
                {answer.questionText || "Question text not available"}
              </p>
              <p>Your Answer: {answer.studentAnswer || "No Answer"}</p>
              <p>Correct Answer: {answer.correctAnswer || "Not Provided"}</p>
              <p
                className={
                  answer.studentAnswer === answer.correctAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {answer.studentAnswer === answer.correctAnswer
                  ? "Correct"
                  : "Incorrect"}
              </p>
            </div>
          ))}
        </div>
        <Button
          onClick={() => navigate(`/course-progress/${quiz.courseId}`)}
          className="w-full mt-5  py-3 px-6 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Course
        </Button>
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {quiz.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {quiz.courseName} • Instructor: {quiz.instructorName}
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-4">Questions: {quiz.totalQuestions}</span>
            <span>Total Marks: {quiz.totalMarks}</span>
          </div>
        </div>
        <div>
          {quiz.questions.map((question, qIndex) => (
            <div key={question._id} className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {question.questionText}
              </h2>
              <div className="space-y-3">
                {question.options.map((option, oIndex) => (
                  <Label
                    key={oIndex}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <Input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={option}
                      checked={answers[qIndex] === option}
                      onChange={() => handleRadioChange(qIndex, option)}
                      className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {option}
                    </span>
                  </Label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full py-3 px-6 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Quiz
      </Button>
    </form>
  );
};

export default QuizAttemptPage;
