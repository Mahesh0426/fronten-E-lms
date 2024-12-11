import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const dummyStudentMarks = [
  {
    id: 1,
    name: "Alice Johnson",
    course: "Mathematics",
    assignment1: 85,
    assignment2: 78,
    midterm: 88,
    final: 92,
  },
  {
    id: 2,
    name: "Bob Smith",
    course: "Physics",
    assignment1: 72,
    assignment2: 80,
    midterm: 75,
    final: 85,
  },
  {
    id: 3,
    name: "Charlie Brown",
    course: "Chemistry",
    assignment1: 90,
    assignment2: 88,
    midterm: 92,
    final: 95,
  },
  {
    id: 4,
    name: "Diana Ross",
    course: "Biology",
    assignment1: 78,
    assignment2: 82,
    midterm: 80,
    final: 88,
  },
  {
    id: 5,
    name: "Ethan Hunt",
    course: "Computer Science",
    assignment1: 95,
    assignment2: 92,
    midterm: 90,
    final: 98,
  },
];

const GradebookGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentMarks, setStudentMarks] = useState(dummyStudentMarks);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = studentMarks.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotal = (student) => {
    return (
      student.assignment1 +
      student.assignment2 +
      student.midterm +
      student.final
    );
  };

  const calculateGrade = (total) => {
    if (total >= 360) return "A";
    if (total >= 320) return "B";
    if (total >= 280) return "C";
    if (total >= 240) return "D";
    return "F";
  };

  const calculatePercentage = (total) => {
    return (total / 400) * 100;
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by name or course"
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <Button>Export to CSV</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="w-full">
            <CardHeader>
              <CardTitle>{student.name}</CardTitle>
              <p className="text-sm text-gray-500">{student.course}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Assignment 1:</span>
                  <span>{student.assignment1}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Assignment 2:</span>
                  <span>{student.assignment2}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Midterm:</span>
                  <span>{student.midterm}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Final:</span>
                  <span>{student.final}/100</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{calculateTotal(student)}/400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Grade:</span>
                  <span className="text-lg font-bold">
                    {calculateGrade(calculateTotal(student))}
                  </span>
                </div>
                <Progress
                  value={calculatePercentage(calculateTotal(student))}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-500">
                  {calculatePercentage(calculateTotal(student)).toFixed(2)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GradebookGrid;
