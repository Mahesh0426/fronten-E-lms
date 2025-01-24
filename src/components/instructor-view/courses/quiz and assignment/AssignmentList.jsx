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
import {
  deleteAssignmentAction,
  fetchAllAssignmentListAction,
  updateAssignmentStatusAction,
} from "@/redux/instructor-quiz and Assignment/AssignmentAction";
import { useDispatch, useSelector } from "react-redux";
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

const AssignmentList = ({ onEditAssignment, instructorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignments } = useSelector((state) => state.assignment);
  const [searchTerm, setSearchTerm] = useState("");

  //handle status toggle
  const handleStatusToggle = (assignmentId, currentStatus) => {
    const newStatus = currentStatus === "Draft" ? "Published" : "Draft";

    try {
      dispatch(updateAssignmentStatusAction(assignmentId, newStatus));
    } catch (error) {
      toast.error("Failed to update quiz status");
    }
  };
  // Filter assignment by courseName
  const filteredAssignments = assignments.filter((assignment) =>
    assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // dispatch assignments action
    dispatch(fetchAllAssignmentListAction(instructorId));
  }, [dispatch, instructorId]);

  //function to delete assignment
  const deleteAssignment = (assignmentId) => {
    try {
      dispatch(deleteAssignmentAction(assignmentId));
    } catch (error) {
      toast.error("Failed to delete assignment");
    }
  };

  return (
    <>
      <div className="mb-6">
        {/* search and filter section */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assignments by course..."
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
      </div>
      {/* asignment list section */}
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
        <TableBody>
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment, index) => (
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
                    {/* view button */}
                    <div className="relative group">
                      <Button
                        onClick={() =>
                          navigate(
                            `/instructor/submitted-assignment/${assignment._id}`
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="p-2 mr-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-md h-8 w-48 shadow-lg">
                        View Student Assignment
                      </div>
                    </div>

                    {/* edit button */}
                    <div className="relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => {
                          onEditAssignment(assignment);
                        }}
                      >
                        <Edit />
                      </Button>
                      {/* tooltip */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-md h-8 w-40 shadow-lg">
                        Edit Assignment
                      </div>
                    </div>

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
                            delete your assignent
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteAssignment(assignment._id);
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
                No assignment found matching your search
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AssignmentList;
