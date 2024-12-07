import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchAllSubmittedQuizByQuizIdAction } from "@/redux/instructor-quiz and Assignment/quizAction";

const ViewSubmittedQuizPage = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const { quizesGradeDetails } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (quizId) {
      dispatch(fetchAllSubmittedQuizByQuizIdAction(quizId));
    }
  }, [dispatch, quizId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submitted Quizzes</h1>

      {quizesGradeDetails && quizesGradeDetails.length > 0 ? (
        <div className="space-y-6">
          {quizesGradeDetails.map((submission) => (
            <Table key={submission._id}>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Student Name</TableCell>
                  <TableCell>{submission.studentName || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Student Email</TableCell>
                  <TableCell>
                    {submission?.studentId?.userEmail || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Quiz Title</TableCell>
                  <TableCell>{submission.quizId?.title || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Submission Status
                  </TableCell>
                  <TableCell>{submission.submissionStatus || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Submitted On</TableCell>
                  <TableCell>
                    {new Date(submission.submittedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Marks</TableCell>
                  <TableCell>
                    {submission.obtainedMarks.toFixed(2)}/
                    {submission.totalMarks.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Correct Answers</TableCell>
                  <TableCell>
                    {submission.correctAnswers}/{submission.totalQuestions}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-blue-500 hover:underline"
                        >
                          View Answers
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Questions & Answers - {submission.studentName} (
                            {submission.studentId?.userEmail})
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          {selectedSubmission && (
                            <ul className="space-y-4">
                              {selectedSubmission.answers.map(
                                (answer, index) => (
                                  <li
                                    key={answer._id}
                                    className={`p-4 rounded border ${
                                      answer.isCorrect
                                        ? "bg-green-100 border-green-500"
                                        : "bg-red-100 border-red-500"
                                    }`}
                                  >
                                    <p>
                                      <strong>Q{index + 1}:</strong>{" "}
                                      {answer.questionText}
                                    </p>
                                    <p>
                                      <strong>Student Answer:</strong>{" "}
                                      {answer.studentAnswer}
                                    </p>
                                    <p>
                                      <strong>Correct Answer:</strong>{" "}
                                      {answer.correctAnswer}
                                    </p>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </div>
      ) : (
        <p>No submissions available for this quiz.</p>
      )}
    </div>
  );
};

export default ViewSubmittedQuizPage;
