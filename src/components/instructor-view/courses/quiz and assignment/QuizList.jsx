import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuizAction,
  fetchAllQuizesListAction,
  updateQuizStatusAction,
} from "@/redux/instructor-quiz and Assignment/quizAction";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const QuizList = ({ onEditQuiz, instructorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizes } = useSelector((state) => state.quiz);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  //handle status toggle
  const handleStatusToggle = (quizId, currentStatus) => {
    const newStatus = currentStatus === "Draft" ? "Published" : "Draft";

    try {
      dispatch(updateQuizStatusAction(quizId, newStatus));
    } catch (error) {
      toast.error("Failed to update quiz status");
    }
  };

  // Filter quizzes based on search term and status
  const filteredQuizes = quizes.filter((quiz) => {
    const matchesSearch = quiz.courseName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || quiz.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    // dispatch quizzes action
    dispatch(fetchAllQuizesListAction(instructorId));
  }, [dispatch, instructorId]);

  //function to delete quiz
  const deleteQuiz = (quizId) => {
    try {
      dispatch(deleteQuizAction(quizId));
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <>
      {/* search and filter section */}
      <div className="flex items-center space-x-4 mb-6">
        {/* search quiz*/}
        <div className="flex-1">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search quizzes by course..."
            className="w-full"
          />
        </div>
        {/* filter status */}
        <Select
          onValueChange={(value) => setStatusFilter(value)}
          value={statusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              {statusFilter === "all"
                ? "Filter by status"
                : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* quiz list */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">SN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>CourseName</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead className="w-[100px] ">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQuizes.length > 0 ? (
            filteredQuizes.map((quiz, index) => (
              <TableRow key={quiz._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>{quiz.courseName}</TableCell>
                <TableCell>{quiz.totalQuestions}</TableCell>
                <TableCell>{quiz.totalMarks}</TableCell>

                <TableCell>
                  <span
                    onClick={() => handleStatusToggle(quiz?._id, quiz.status)}
                    className={`px-2 py-1 rounded-full cursor-pointer text-xs ${
                      quiz.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {quiz.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/* view button */}
                    <div className="relative group">
                      <Button
                        onClick={() =>
                          navigate(`/instructor/submitted-quiz/${quiz?._id}`)
                        }
                        variant="ghost"
                        size="sm"
                        className="p-2 mr-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {/* tooltip */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-md h-8 w-40 shadow-lg">
                        View Student Quiz
                      </div>
                    </div>

                    {/* edit button */}
                    <div className="relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => {
                          onEditQuiz(quiz);
                        }}
                      >
                        <Edit />
                      </Button>
                      {/* tooltip */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-md h-8 w-20 shadow-lg">
                        Edit Quiz
                      </div>
                    </div>

                    {/* delete button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="p-2 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your quiz
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteQuiz(quiz._id);
                            }}
                          >
                            delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="text-center text-gray-600 text-lg m-4 p-4"
                colSpan={7}
              >
                No quiz found matching your search
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default QuizList;
