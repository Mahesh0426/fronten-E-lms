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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ViewSubmittedQuizPage = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();

  const { quizesGradeDetails } = useSelector((state) => state.quiz);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // to fetch submitted quiz
  useEffect(() => {
    if (quizId) {
      dispatch(fetchAllSubmittedQuizByQuizIdAction(quizId));
    }
  }, [dispatch, quizId]);

  // Filter submissions by student name
  const filteredSubmissions = quizesGradeDetails.filter((submission) => {
    const studentName = submission.studentName || "";
    return studentName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-10">
          Submitted Quizzes
        </h1>

        {/* Search Input */}
        <Card className="mb-8 border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Search Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex items-center space-x-3 bg-white border border-gray-300 rounded-md px-3 py-2">
              <Search className="text-gray-500" />
              <Input
                type="text"
                placeholder="Search by student name..."
                className="flex-1 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quizzes Table */}
        {filteredSubmissions && filteredSubmissions.length > 0 ? (
          <div className="space-y-8">
            {filteredSubmissions.map((submission) => (
              <Card
                key={submission._id}
                className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <Table className="w-full">
                    <TableBody>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-700 py-3 px-4 w-1/3">
                          Student Name
                        </TableCell>
                        <TableCell className="text-gray-600 px-4">
                          {submission.studentName || "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-700 py-3 px-4 w-1/3">
                          Student Email
                        </TableCell>
                        <TableCell className="text-gray-600 px-4">
                          {submission?.studentId?.userEmail || "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-700 py-3 px-4 w-1/3">
                          Quiz Title
                        </TableCell>
                        <TableCell className="text-gray-600 px-4">
                          {submission.quizId?.title || "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-700 py-3 px-4 w-1/3">
                          Submission Status
                        </TableCell>
                        <TableCell className="text-gray-600 px-4">
                          {submission.submissionStatus || "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-700 py-3 px-4 w-1/3">
                          Submitted On
                        </TableCell>
                        <TableCell className="text-gray-600 px-4">
                          {new Date(submission.submittedAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-700 py-3 px-4 w-1/3">
                          Total Marks
                        </TableCell>
                        <TableCell className="text-gray-600 px-4">
                          {submission.obtainedMarks.toFixed(2)}/
                          {submission.totalMarks.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-700 py-3 px-4 w-1/3">
                          Correct Answers
                        </TableCell>
                        <TableCell className="text-gray-600 px-4">
                          {submission.correctAnswers}/
                          {submission.totalQuestions}
                        </TableCell>
                      </TableRow>
                      {/* dialog section */}
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() =>
                                  setSelectedSubmission(submission)
                                }
                                className="text-blue-600 hover:underline"
                              >
                                View Answers
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white p-6 rounded-md">
                              <DialogHeader className="mb-4">
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                  Questions & Answers - {submission.studentName}{" "}
                                  ({submission.studentId?.userEmail})
                                </DialogTitle>
                              </DialogHeader>
                              <div className="mt-4">
                                {selectedSubmission && (
                                  <ul className="space-y-4">
                                    {selectedSubmission.answers.map(
                                      (answer, index) => (
                                        <li
                                          key={answer._id}
                                          className={`p-4 rounded border transition-colors ${
                                            answer.isCorrect
                                              ? "bg-green-100 border-green-400"
                                              : "bg-red-100 border-red-400"
                                          }`}
                                        >
                                          <p className="font-medium text-gray-800">
                                            Q{index + 1}: {answer.questionText}
                                          </p>
                                          <p className="mt-1 text-gray-700">
                                            <strong>Student Answer:</strong>{" "}
                                            {answer.studentAnswer}
                                          </p>
                                          <p className="mt-1 text-gray-700">
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
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-8">
            No submissions available for this quiz.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewSubmittedQuizPage;
