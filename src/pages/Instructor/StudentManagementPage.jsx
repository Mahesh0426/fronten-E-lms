import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy data
const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    course: "Mathematics",
    progress: 75,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    course: "Physics",
    progress: 60,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    course: "Chemistry",
    progress: 90,
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    course: "Biology",
    progress: 85,
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    course: "Computer Science",
    progress: 70,
  },
];

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Students</h2>
          <p className="text-3xl font-bold">{students.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Average Progress</h2>
          <p className="text-3xl font-bold">
            {Math.round(
              students.reduce((acc, student) => acc + student.progress, 0) /
                students.length
            )}
            %
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Active Courses</h2>
          <p className="text-3xl font-bold">
            {new Set(students.map((s) => s.course)).size}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableCaption>A list of your students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.progress}%</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentManagement;
