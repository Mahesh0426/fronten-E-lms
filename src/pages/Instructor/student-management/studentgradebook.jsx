import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import { fetchAllMarksByInstructorIdAction } from "@/redux/grade/gradeAction";

const GradebookTable = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { allStudentMarks, uniqueCourses, isLoading } = useSelector(
    (state) => state.grade
  );

  const instructorId = user?._id;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  // const [average, setAverage] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    if (instructorId) {
      dispatch(fetchAllMarksByInstructorIdAction(instructorId));
    }
  }, [dispatch, instructorId]);

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered students
  const filteredStudents = allStudentMarks.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterCourse || student.course === filterCourse)
  );
  //fucntion to download csv file
  const handleExportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Course",
      "Assignment Score",
      "Assignment Max Score",
      "Quiz Score",
      "Quiz Max Score",
      "Total Marks",
      "Grade",
    ];

    const rows = filteredStudents.map((student) => {
      const total = calculateTotal(student);
      const maxScore = calculateMaxScore(student);
      const grade = calculateGrade(calculateProgress(total, maxScore));
      return [
        student.name,
        student.email,
        student.course,
        student.assignmentScore,
        student.assignmentMaxScore,
        student.quizScore,
        student.quizTotalMarks,
        `${total}/${maxScore}`,
        grade,
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gradebook.csv";
    link.click();
  };

  const calculateTotal = (student) =>
    student.assignmentScore + student.quizScore;

  const calculateMaxScore = (student) =>
    student.assignmentMaxScore + student.quizTotalMarks;

  const calculateProgress = (total, maxScore) =>
    maxScore > 0 ? (total / maxScore) * 100 : 0;

  const calculateGrade = (percentage) => {
    if (percentage < 50) return "F";
    if (percentage >= 50 && percentage < 65) return "P";
    if (percentage >= 65 && percentage < 75) return "C";
    if (percentage >= 75 && percentage < 86) return "D";
    return "HD";
  };
  const getProgressBarColor = (grade) => {
    switch (grade) {
      case "HD":
        return "bg-green-600";
      case "D":
        return "bg-blue-500";
      case "C":
        return "bg-yellow-500";
      case "P":
        return "bg-orange-500";
      case "F":
        return "bg-red-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="  flex justify-between items-center">
        <h1 className=" mb-3 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Student Management
        </h1>
        <Button
          className="rounded-md bg-indigo-600 text-white font-bold"
          onClick={handleExportToCSV}
        >
          <Download /> Export to CSV
        </Button>
      </div>

      {/* Search and Filter */}
      <div className=" mt-2 mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by student..."
          value={searchTerm}
          onChange={handleSearch}
          className="mr-2"
        />
        <Select value={filterCourse} onValueChange={setFilterCourse}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by Course" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCourses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <PageLoadingSpinner />
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-300px)] ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Quiz</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => {
                const total = calculateTotal(student);
                const maxScore = calculateMaxScore(student);
                const progress = calculateProgress(total, maxScore);
                const grade = calculateGrade(progress);

                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>
                      {student.assignmentScore}/{student.assignmentMaxScore}
                    </TableCell>
                    <TableCell>
                      {student.quizScore}/{student.quizTotalMarks}
                    </TableCell>
                    <TableCell>
                      {total}/{maxScore}
                    </TableCell>
                    <TableCell>{grade}</TableCell>
                    <TableCell>
                      <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
                        <div
                          className={`h-full ${getProgressBarColor(
                            grade
                          )} transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">
                        {progress.toFixed(2)}%
                      </div>{" "}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default GradebookTable;
