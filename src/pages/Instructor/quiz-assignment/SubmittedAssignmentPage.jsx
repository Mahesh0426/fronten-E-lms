import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editSubmittedAssignmentAction,
  fetchAllSubmittedAssignmentsListAction,
} from "@/redux/instructor-quiz and Assignment/AssignmentAction";
import GradeAssignmentForm from "@/components/instructor-view/courses/quiz and assignment/AssignmentGradingForm";
import { Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ViewSubmittedAssignmentsPage = () => {
  const { assignmentId } = useParams();
  const dispatch = useDispatch();

  const { submittedAssignmentsList } = useSelector((state) => state.assignment);
  const [currentEditedSubmissionId, setCurrentEditedSubmissionId] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  //fetch all the assignments list
  useEffect(() => {
    if (assignmentId) {
      dispatch(fetchAllSubmittedAssignmentsListAction(assignmentId));
    }
  }, [dispatch, assignmentId]);

  // function to handle edit submission
  const handleEditSubmission = (assignmentId, studentId, updatedData) => {
    dispatch(
      editSubmittedAssignmentAction(assignmentId, studentId, updatedData)
    );
  };

  // Filter submissions by student name
  const filteredSubmissions = submittedAssignmentsList.filter((submission) => {
    const studentName = submission.studentId?.userName || "";
    return studentName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Submitted Assignments
      </h1>

      <div className="bg-white p-6 rounded-md shadow-sm border">
        {/* Search Input */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Search Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Search className="text-gray-400" />
              <Input
                type="text"
                placeholder="Search by student name.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submission List */}
        {filteredSubmissions.length > 0 ? (
          <ul className="space-y-6">
            {filteredSubmissions.map((submission) => (
              <li
                key={submission._id}
                className="bg-gray-50 border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-800">
                      {submission.studentId?.userName || "N/A"}
                    </p>
                    <Badge variant="secondary">
                      Submitted On:{" "}
                      {new Date(submission.submissionDate).toLocaleString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong>{" "}
                    {submission.studentId?.userEmail || "N/A"}
                  </p>
                  <hr />
                  <p className="text-sm text-gray-700">
                    <strong>Assignment Title:</strong>{" "}
                    {submission.assignmentId?.title}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Description:</strong>{" "}
                    {submission.assignmentId?.description}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Max Score:</strong>{" "}
                    {submission.assignmentId?.maxScore}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Content:</strong> {submission.content}
                  </p>
                </div>
                <hr className="my-4" />

                {currentEditedSubmissionId === submission._id ||
                (!submission.score && !submission.review) ? (
                  <div className="mt-4">
                    <GradeAssignmentForm
                      assignmentId={submission.assignmentId?._id}
                      studentId={submission.studentId?._id}
                      maxScore={submission.assignmentId?.maxScore}
                      score={submission.score}
                      review={submission.review}
                      onSuccess={(updatedData) =>
                        handleEditSubmission(
                          submission.assignmentId?._id,
                          submission.studentId?._id,
                          updatedData
                        )
                      }
                      onCancel={() => setCurrentEditedSubmissionId(null)}
                    />
                  </div>
                ) : (
                  <div className="mt-6 p-4 rounded-md bg-white border border-gray-200 shadow-inner">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-medium text-gray-800">
                        Grade Summary
                      </h3>
                      <Button
                        onClick={() =>
                          setCurrentEditedSubmissionId(submission._id)
                        }
                        variant="ghost"
                        className="rounded-md hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="w-5 h-5" />
                        <span className="ml-2">Edit</span>
                      </Button>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Score:</strong>{" "}
                        {submission.score || "Not Graded"}
                      </p>
                      <p>
                        <strong>Review:</strong>{" "}
                        {submission.review || "No Review"}
                      </p>
                      {submission.gradingDate && (
                        <p>
                          <strong>Graded On:</strong>{" "}
                          {new Date(submission.gradingDate).toLocaleString()}
                        </p>
                      )}
                      <p>
                        <strong>Graded By:</strong>{" "}
                        {submission?.gradedBy?.userName || "N/A"} (
                        {submission?.gradedBy?.userEmail || "N/A"})
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">
            No submissions available for this assignment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewSubmittedAssignmentsPage;
