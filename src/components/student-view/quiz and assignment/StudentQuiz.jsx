import { Button } from "@/components/ui/button";
import { fetchQuizByIdAction } from "@/redux/instructor-quiz and Assignment/quizAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const StudentQuiz = () => {
  const { id: courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quiz } = useSelector((state) => state.quiz);

  // Fetch the quiz by courseId on mount
  useEffect(() => {
    if (courseId) {
      dispatch(fetchQuizByIdAction(courseId));
    }
  }, [dispatch, courseId]);

  //function to handle quiz attempts
  const handleTakeQuiz = (quizData) => {
    navigate(`/student-quiz/${quizData._id}`, { state: { quiz: quizData } });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Quiz List
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {Array.isArray(quiz) && quiz.length > 0 ? (
            quiz.map((quizItem) => (
              <li key={quizItem._id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {quizItem.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {quizItem?.totalQuestions} questions •{" "}
                      {quizItem?.totalMarks} marks
                    </p>
                  </div>
                  <Button
                    onClick={() => handleTakeQuiz(quizItem)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Take Quiz
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 text-gray-500">No quiz available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudentQuiz;
