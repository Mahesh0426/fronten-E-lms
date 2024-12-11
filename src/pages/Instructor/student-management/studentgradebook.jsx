import React, { useEffect, useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { fetchAllMarksByInstructorId } from "@/axios/marks/marksAxios";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GradebookTable = () => {
  const { user } = useSelector((state) => state.user);
  const instructorId = user?._id;
  const [searchTerm, setSearchTerm] = useState("");
  const [studentMarks, setStudentMarks] = useState([]);
  const [filterCourse, setFilterCourse] = useState("");
  const [uniqueCourses, setUniqueCourses] = useState([]);

  //use effect to fetch all students marks
  useEffect(() => {
    const fetchMarks = async () => {
      if (!instructorId) return;
      try {
        const response = await fetchAllMarksByInstructorId(instructorId);

        if (response?.status === "success") {
          //Creates an empty array to store assignments and quizzes.
          const combinedData = [];
          const assignments = response.data.assignments || [];
          const quizzes = response.data.quizzes || [];

          assignments.forEach((assignment) => {
            combinedData.push({
              name: assignment.studentName,
              email: assignment.studentEmail,
              course: assignment.courseTitle,
              assignmentScore: assignment.score,
              assignmentMaxScore: assignment.maxScore,
              quizScore: 0,
              quizTotalMarks: 0,
            });
          });

          quizzes.forEach((quiz) => {
            const existing = combinedData.find(
              (item) =>
                item.name === quiz.studentName &&
                item.email === quiz.studentEmail &&
                item.course === quiz.courseTitle
            );

            if (existing) {
              existing.quizScore = quiz.obtainedMarks;
              existing.quizTotalMarks = quiz.totalMarks;
            } else {
              combinedData.push({
                name: quiz.studentName,
                email: quiz.studentEmail,
                course: quiz.courseTitle,
                assignmentScore: 0,
                assignmentMaxScore: 0,
                quizScore: quiz.obtainedMarks,
                quizTotalMarks: quiz.totalMarks,
              });
            }
          });

          setStudentMarks(combinedData);

          // Extract unique course titles for the dropdown
          const courses = [
            ...new Set(combinedData.map((data) => data?.course)),
          ];
          setUniqueCourses(courses);
        }
      } catch (error) {
        console.error("Error fetching marks:", error);
      }
    };

    fetchMarks();
  }, [instructorId]);

  //function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter students based on search term and selected course
  const filteredStudents = studentMarks.filter(
    (student) =>
      (student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course?.toLowerCase().includes(searchTerm.toLowerCase())) &&
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

    const rows = studentMarks.map((student) => {
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

  // function to calculate total score
  const calculateTotal = (student) => {
    return student.assignmentScore + student.quizScore;
  };

  // function to calculate total score
  const calculateMaxScore = (student) => {
    return student.assignmentMaxScore + student.quizTotalMarks;
  };

  // function to calculate progress percentage
  const calculateProgress = (total, maxScore) => {
    return maxScore > 0 ? (total / maxScore) * 100 : 0;
  };

  //function to calculate grade
  const calculateGrade = (percentage) => {
    if (percentage < 50) return "F";
    if (percentage >= 50 && percentage < 65) return "P";
    if (percentage >= 65 && percentage < 75) return "C";
    if (percentage >= 75 && percentage < 86) return "D";
    return "HD";
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Student Management
        </h1>
        <Button
          className="w-full sm:w-auto  rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          onClick={handleExportToCSV}
        >
          Export to CSV
        </Button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by student or course..."
          value={searchTerm}
          onChange={handleSearch}
          className=" mt-2 mr-2 w-full"
        />
        <Select value={filterCourse} onValueChange={setFilterCourse}>
          <SelectTrigger className=" mt-2 w-1/4">
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
      <div className="overflow-x-auto overflow-y-auto max-h-100">
        <Table>
          <TableHeader>
            <TableRow>
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
                    <div className="w-full max-w-xs">
                      <Progress value={progress} className="w-full" />
                      <div className="text-xs text-center mt-1">
                        {progress.toFixed(2)}%
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GradebookTable;
