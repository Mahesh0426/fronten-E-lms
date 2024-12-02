import React, { useEffect } from "react";
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
  fetchAllQuizesListAction,
  updateQuizStatusAction,
} from "@/redux/instructor-quiz and Assignment/quizAction";

const QuizList = () => {
  const { quizes } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();

  //handle status toggle
  const handleStatusToggle = (quizId, currentStatus) => {
    const newStatus = currentStatus === "Draft" ? "Published" : "Draft";

    try {
      dispatch(updateQuizStatusAction(quizId, newStatus));
    } catch (error) {
      toast.error("Failed to update quiz status");
    }
  };

  useEffect(() => {
    // dispatch quizzes action
    dispatch(fetchAllQuizesListAction());
  }, [dispatch]);

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input placeholder="Search quizzes..." className="w-full" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">SN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>CourseName</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizes.map((quiz, index) => (
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
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default QuizList;
