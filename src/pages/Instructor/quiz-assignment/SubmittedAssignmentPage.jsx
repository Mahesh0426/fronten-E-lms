import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllSubmittedAssignmentsListAction } from "@/redux/instructor-quiz and Assignment/AssignmentAction";
import GradeAssignmentForm from "@/components/instructor-view/courses/quiz and assignment/AssignmentGradingForm";

const ViewSubmittedAssignmentsPage = () => {
  const { assignmentId } = useParams();
  const dispatch = useDispatch();

  const { submittedAssignmentsList } = useSelector((state) => state.assignment);

  useEffect(() => {
    if (assignmentId) {
      dispatch(fetchAllSubmittedAssignmentsListAction(assignmentId));
    }
  }, [dispatch, assignmentId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submitted Assignments</h1>

      {submittedAssignmentsList.length > 0 ? (
        <ul className="space-y-4">
          {submittedAssignmentsList.map((submission) => (
            <li key={submission._id} className="p-4 border rounded">
              <p>
                <strong>Student Name:</strong>{" "}
                {submission.studentId?.userName || "N/A"}
              </p>
              <p>
                <strong>Student Email:</strong>{" "}
                {submission.studentId?.userEmail || "N/A"}
              </p>
              <p>
                <strong>Assignment Title:</strong>{" "}
                {submission.assignmentId?.title}
              </p>
              <p>
                <strong>Assignment Description:</strong>{" "}
                {submission.assignmentId?.description}
              </p>

              <p>
                <strong>Submitted On:</strong>{" "}
                {new Date(submission.submissionDate).toLocaleString()}
              </p>
              <p>
                <strong>Max Score:</strong> {submission.assignmentId?.maxScore}
              </p>
              <p>
                <strong>Content:</strong> {submission.content}
              </p>
              {submission.gradingStatus === "Not graded" && (
                <GradeAssignmentForm
                  assignmentId={
                    submission.assignmentId?._id || submission.assignmentId
                  }
                  studentId={submission.studentId?._id || submission.studentId}
                />
              )}
              <hr />
              {submission.gradingStatus === "Graded" && (
                <div className="mt-6 p-4 border rounded bg-gray-100">
                  <h3 className="text-lg font-medium text-gray-800">
                    Grade Summary
                  </h3>
                  <p>
                    <strong>Score:</strong> {submission.score}
                  </p>
                  <p>
                    <strong>Review:</strong> {submission.review}
                  </p>
                  <p>
                    <strong>Graded On :</strong>{" "}
                    {new Date(submission.gradingDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Graded By:</strong> {submission?.gradedBy?.userName}{" "}
                    ({submission?.gradedBy?.userEmail})
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No submissions available for this assignment.</p>
      )}
    </div>
  );
};

export default ViewSubmittedAssignmentsPage;
