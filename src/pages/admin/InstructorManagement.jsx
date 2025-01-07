import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const InstructorManagementPage = () => {
  const { user } = useSelector((state) => state.user);
  const [instructors, setInstructors] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", isInstructor: true },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      isInstructor: false,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      isInstructor: true,
    },
  ]);

  const handleRoleToggle = (id) => {
    setInstructors(
      instructors.map((instructor) =>
        instructor.id === id
          ? { ...instructor, isInstructor: !instructor.isInstructor }
          : instructor
      )
    );
  };

  const handleAddInstructor = () => {
    // Implement logic to add a new instructor
    console.log("Add new instructor");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
        Instructor Management
      </h1>

      {/* Add Instructor Button */}
      <div className="mb-6">
        <Button
          onClick={handleAddInstructor}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Instructor
        </Button>
      </div>

      {/* Instructor Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell>
                  {instructor.isInstructor ? "Instructor" : "User"}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={instructor.isInstructor}
                    onCheckedChange={() => handleRoleToggle(instructor.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InstructorManagementPage;
