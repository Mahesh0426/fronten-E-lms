import { fetchQuizByIdAction } from "@/redux/instructor-quiz and Assignment/quizAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StudentQuiz = () => {
  const { user } = useSelector((state) => state.user);

  const { id: courseId } = useParams();
  const dispatch = useDispatch();

  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchQuizByIdAction(courseId));
    }
  }, [dispatch, courseId]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Quiz List
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {quiz.map((quiz) => (
            <li key={quiz._id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {quiz.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {quiz?.totalQuestions} questions • {quiz?.totalMarks} marks
                  </p>
                </div>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Take Quiz
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentQuiz;
