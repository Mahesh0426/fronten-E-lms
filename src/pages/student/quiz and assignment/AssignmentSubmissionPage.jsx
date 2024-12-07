import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createAssignmentSubmissionAction,
  fetchAssignmentByIdAction,
  fetchSubmittedAssignmentByIdAction,
} from "@/redux/instructor-quiz and Assignment/AssignmentAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AssignmentSubmissionPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve assignment data from state
  const { assignment } = location.state || {};
  const { user } = useSelector((state) => state.user);
  const { submittedAssignment } = useSelector((state) => state.assignment);
  const [content, setContent] = useState("");

  //function to handle assignment submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!assignment?._id || !user?._id || !content.trim()) {
      return toast.error("All fields are required!");
    }

    const payload = {
      assignmentId: assignment?._id,
      studentId: user?._id,
      content: content.trim(),
    };
    try {
      dispatch(createAssignmentSubmissionAction(payload));
      navigate(-1);
    } catch (error) {
      console.error("Error submitting assignment:", response.message);
    }
  };

  // Fetch the assignment details  on mount
  useEffect(() => {
    if (assignment?.courseId) {
      dispatch(fetchAssignmentByIdAction(assignment.courseId));
    }
  }, [dispatch, assignment?.courseId]);

  // Fetch the submitted assignment on mount
  useEffect(() => {
    if ((assignment?._id, user?._id)) {
      dispatch(fetchSubmittedAssignmentByIdAction(assignment?._id, user?._id));
    }
  }, [dispatch, user?._id]);

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {assignment.courseName}
          </h1>
          <h1 className="text-2xl mt-3 font-bold text-gray-900 dark:text-white">
            {assignment.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {assignment.description}
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-4">
              Due Date: {new Date(assignment.dueDate).toLocaleString()}
            </span>
            <span>Max Score: {assignment.maxScore}</span>
          </div>
        </div>
        {submittedAssignment?._id &&
        submittedAssignment.submissionStatus === "Submitted" ? (
          // Display submitted assignment details in table
          // <div className="p-6">
          //   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          //     Your Submission:
          //   </h3>
          //   <p className="mt-2 text-gray-700 dark:text-gray-300">
          //     {submittedAssignment.content}
          //   </p>
          //   <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          //     Submission Date:{" "}
          //     {new Date(submittedAssignment.submissionDate).toLocaleString()}
          //   </p>
          //   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          //     Submission Status: {submittedAssignment.submissionStatus}
          //   </p>
          //   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          //     Grading Status: {submittedAssignment.gradingStatus}
          //   </p>
          //   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          //     Your Score:{" "}
          //     {submittedAssignment.gradingStatus === "Graded"
          //       ? `${submittedAssignment.score}/${assignment.maxScore}`
          //       : "N/A"}
          //   </p>
          //   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          //     Feedback:{" "}
          //     {submittedAssignment.gradingStatus === "Graded"
          //       ? submittedAssignment.review
          //       : "N/A"}
          //   </p>
          //   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          //     Graded On :{" "}
          //     {submittedAssignment.gradingStatus === "Graded"
          //       ? new Date(submittedAssignment.gradingDate).toLocaleString()
          //       : "N/A"}
          //   </p>
          // </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Submission:
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40 font-bold">Detail</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="w-40 font-bold">Content</TableCell>
                  <TableCell>{submittedAssignment.content}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-40 font-bold">
                    Submission Date
                  </TableCell>
                  <TableCell>
                    {new Date(
                      submittedAssignment.submissionDate
                    ).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-40 font-bold">
                    Submission Status
                  </TableCell>
                  <TableCell>{submittedAssignment.submissionStatus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-40 font-bold">
                    Grading Status
                  </TableCell>
                  <TableCell>{submittedAssignment.gradingStatus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-40 font-bold">Your Score</TableCell>
                  <TableCell>
                    {submittedAssignment.gradingStatus === "Graded"
                      ? `${submittedAssignment.score.toFixed(
                          2
                        )}/${assignment.maxScore.toFixed(2)}`
                      : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-40 font-bold">Feedback</TableCell>
                  <TableCell>
                    {submittedAssignment.gradingStatus === "Graded"
                      ? submittedAssignment.review
                      : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-40 font-bold">Graded By</TableCell>
                  <TableCell>
                    {submittedAssignment.gradingStatus === "Graded"
                      ? assignment.instructorName
                      : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-40 font-bold">Graded On</TableCell>
                  <TableCell>
                    {submittedAssignment.gradingStatus === "Graded"
                      ? new Date(
                          submittedAssignment.gradingDate
                        ).toLocaleString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          // Display form for submission
          <div className="p-6">
            <Label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Answer
            </Label>
            <Textarea
              id="content"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Write your answer here..."
              required
            />
            <Button
              type="submit"
              className="w-full mt-5  py-3 px-6 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Assignment
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default AssignmentSubmissionPage;
