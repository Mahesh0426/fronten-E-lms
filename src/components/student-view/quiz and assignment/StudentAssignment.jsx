import { fetchAssignmentByIdAction } from "@/redux/instructor-quiz and Assignment/AssignmentAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const StudentAssignment = () => {
  const { user } = useSelector((state) => state.user);
  const { assignment } = useSelector((state) => state.assignment);

  const { id: courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchAssignmentByIdAction(courseId));
    }
  }, [dispatch, courseId]);

  //function to handle assignment  submission
  const handleSubmitAssignment = (assignmentData) => {
    navigate(`/student-assignment/${assignmentData._id}`, {
      state: { assignment: assignmentData },
    });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Assignment List
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {Array.isArray(assignment) && assignment.length > 0 ? (
            assignment.map((item) => (
              <li key={item._id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.maxScore} Total Marks •{" "}
                      {new Date(item.dueDate).toLocaleDateString()} Due Date
                    </p>
                  </div>
                  <button
                    onClick={() => handleSubmitAssignment(item)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submission Link
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 text-gray-500">
              No assignments available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudentAssignment;
