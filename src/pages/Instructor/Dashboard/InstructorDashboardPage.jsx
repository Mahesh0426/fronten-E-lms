import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, DollarSign, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { fetchRevenueData } from "@/axios/student-course/orderAxios";
import RevenueChart from "@/components/instructor-view/charts/RevenueChart";

const InstructorDashboardPage = () => {
  const { courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const instructorId = user?._id;

  const [revenueData, setRevenueData] = useState([]);

  // Fetch revenue data on mount
  useEffect(() => {
    const revenueData = async () => {
      try {
        const response = await fetchRevenueData(instructorId);

        setRevenueData(response.data || []);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };
    revenueData();
  }, [instructorId]);

  //function to calculate total
  const calculateTotalStudentsAndProfit = () => {
    const { totalStudents, totalProfit, totalCourses, studentList } =
      courses.reduce(
        (acc, course) => {
          const studentCount = course.students.length;
          acc.totalStudents += studentCount;
          acc.totalProfit += course.pricing * studentCount;
          acc.totalCourses++;

          course.students.forEach((student) => {
            acc.studentList.push({
              courseTitle: course.title,
              studentName: student.studentName,
              studentEmail: student.studentEmail,
            });
          });

          return acc;
        },
        {
          totalStudents: 0,
          totalProfit: 0,
          totalCourses: 0,
          studentList: [],
        }
      );

    return {
      totalProfit,
      totalStudents,
      studentList,
      totalCourses,
    };
  };

  // Config for dashboard card items
  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: calculateTotalStudentsAndProfit().totalStudents,
    },
    {
      icon: BookOpen,
      label: "Total Active Courses",
      value: calculateTotalStudentsAndProfit().totalCourses,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: calculateTotalStudentsAndProfit().totalProfit,
    },
  ];

  return (
    <div className="p-8">
      {/* header */}
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
        Welcome,{" "}
        {user?.userName &&
          user.userName.charAt(0).toUpperCase() +
            user.userName.slice(1).toLowerCase()}
      </h1>
      {/*  total data show cards */}
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(120vh-300px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {config.map((item, index) => (
            <Card
              key={index}
              className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  {item.label}
                </CardTitle>
                <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {item.label === "Total Revenue"
                    ? `$ ${item.value}`
                    : item.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* revenue charts */}
        <Card className="mt-6 ">
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart revenueData={revenueData} />
          </CardContent>
        </Card>

        {/* student list */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col overflow-y-auto max-h-[calc(80vh-300px)]">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Course Name</TableHead>
                    <TableHead className="font-bold">Student Name</TableHead>
                    <TableHead className="font-bold">Student Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calculateTotalStudentsAndProfit().studentList.map(
                    (studentItem, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {studentItem.courseTitle}
                        </TableCell>
                        <TableCell>{studentItem.studentName}</TableCell>
                        <TableCell>{studentItem.studentEmail}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
