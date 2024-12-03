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
import {
  fetchAllAssignmentListAction,
  updateAssignmentStatusAction,
} from "@/redux/instructor-quiz and Assignment/AssignmentAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AssignmentList = () => {
  const { assignments } = useSelector((state) => state.assignment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle status toggle
  const handleStatusToggle = (assignmentId, currentStatus) => {
    const newStatus = currentStatus === "Draft" ? "Published" : "Draft";

    try {
      dispatch(updateAssignmentStatusAction(assignmentId, newStatus));
    } catch (error) {
      toast.error("Failed to update quiz status");
    }
  };

  useEffect(() => {
    // dispatch assignments action
    dispatch(fetchAllAssignmentListAction());
  }, [dispatch]);

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input placeholder="Search assignments..." className="w-full" />
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
            <TableHead>Due Date</TableHead>
            <TableHead>Max Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <TableRow key={assignment._id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.courseName}</TableCell>
              <TableCell>
                {new Date(assignment.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{assignment.maxScore}</TableCell>
              <TableCell className="w-[100px]">
                <span
                  onClick={() =>
                    handleStatusToggle(assignment?._id, assignment.status)
                  }
                  className={`px-2 py-1 rounded-full cursor-pointer text-xs ${
                    assignment.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {assignment.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    onClick={() =>
                      navigate(
                        `/instructor/submitted-assignment/${assignment._id}`
                      )
                    }
                    variant="ghost"
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="ghost"
                    size="icon"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center text-2xl m-4" colSpan={7}>
              No assignments found
            </TableCell>
          </TableRow>
        )}
      </Table>
    </>
  );
};

export default AssignmentList;
