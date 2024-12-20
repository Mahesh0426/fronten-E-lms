import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageLoadingSpinner from "@/components/helper/PageLoadingSpinner";
import { fetchMarksByStudentIdAction } from "@/redux/grade/gradeAction";
import PerformanceChart from "./PerformanceChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

const MyPerformancePage = () => {
  const dispatch = useDispatch();

  // Select user and student marks from Redux store
  const { user } = useSelector((state) => state.user);
  const { studentMarks, isLoading } = useSelector((state) => state.grade);

  const studentId = user?._id;

  useEffect(() => {
    if (studentId) {
      dispatch(fetchMarksByStudentIdAction(studentId));
    }
  }, [dispatch, studentId]);

  // Helper functions
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

  //function to export in pdf
  const handleExportPDF = async () => {
    try {
      // Select the HTML element you want to capture
      const element = document.getElementById("grading-summary");

      // Use html2canvas to capture the element as a canvas
      const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better resolution
      const imgData = canvas.toDataURL("image/png"); // Convert canvas to png data

      // "p" for portrait, "mm" for millimeters, "a4" for A4 size paper
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // PDF width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("grading-summary.pdf");
    } catch (error) {
      console.error("Failed to export PDF:", error);
    }
  };
  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl mb-4 font-bold text-indigo-600">
          My performance
        </h1>

        <div
          className="overflow-x-auto mx-auto"
          style={{
            maxWidth: "100%",
            height: "400px",
          }}
        >
          <PerformanceChart studentMarks={studentMarks} />
        </div>
      </div>

      <div className="p-4 mt-4 ">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl sm:text-3xl mb-4 font-bold text-indigo-600 ">
            Grading Summary
          </h1>
          <Button
            className=" text-end   mb-2 rounded-md bg-indigo-600 text-white font-bold mt-4 hover:bg-indigo-400"
            onClick={handleExportPDF}
          >
            Export to PDF
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <PageLoadingSpinner />
          </div>
        ) : (
          <div id="grading-summary" className="overflow-x-auto">
            <Table className="table-auto w-full border-collapse border border-gray-200">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-left p-2">Course</TableHead>
                  <TableHead className="text-left p-2">Assignment</TableHead>
                  <TableHead className="text-left p-2">Quiz</TableHead>
                  <TableHead className="text-left p-2">Total Marks</TableHead>
                  <TableHead className="text-left p-2">Grade</TableHead>
                  <TableHead className="text-left p-2">Overall</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentMarks?.map((data, index) => {
                  const total = calculateTotal(data);
                  const maxScore = calculateMaxScore(data);
                  const progress = calculateProgress(total, maxScore);
                  const grade = calculateGrade(progress);

                  return (
                    <TableRow key={index} className="hover:bg-gray-100">
                      <TableCell className="p-2">{data.course}</TableCell>
                      <TableCell className="p-2">
                        {data.assignmentScore}/{data.assignmentMaxScore}
                      </TableCell>
                      <TableCell className="p-2">
                        {data.quizScore}/{data.quizTotalMarks}
                      </TableCell>
                      <TableCell className="p-2">
                        {total}/{maxScore}
                      </TableCell>
                      <TableCell className="p-2">{grade}</TableCell>
                      <TableCell className="p-2">
                        {progress.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPerformancePage;
