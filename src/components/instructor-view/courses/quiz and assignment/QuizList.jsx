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
  fetchAllQuizesListAction,
  updateQuizStatusAction,
} from "@/redux/instructor-quiz and Assignment/quizAction";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizes } = useSelector((state) => state.quiz);
  const [searchTerm, setSearchTerm] = useState("");

  //handle status toggle
  const handleStatusToggle = (quizId, currentStatus) => {
    const newStatus = currentStatus === "Draft" ? "Published" : "Draft";

    try {
      dispatch(updateQuizStatusAction(quizId, newStatus));
    } catch (error) {
      toast.error("Failed to update quiz status");
    }
  };

  // Filter quiz by courseName
  const filteredQuizes = quizes.filter((quiz) =>
    quiz.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // dispatch quizzes action
    dispatch(fetchAllQuizesListAction());
  }, [dispatch]);

  return (
    <>
      {/* search and filter section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search quizzes by course..."
            className="w-full"
          />
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <Trash2 />
                    </Button>
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
