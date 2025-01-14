import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCog, ShieldCheck } from "lucide-react";
import { getAllUsers } from "@/axios/userAxios";
import { useSelector } from "react-redux";

const AdminDashboardPage = () => {
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  // count each role in users
  const countRole = (role) => users.filter((user) => user.role === role).length;

  // function to get all the user
  const fetchAllUsers = async () => {
    const resposne = await getAllUsers();

    if (resposne.status === "success") {
      setUsers(resposne.data);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
        Welcome, {user.userName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countRole("user")}</div>
            <p className="text-xs text-gray-500 mt-1">Active accounts</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Instructors
            </CardTitle>
            <UserCog className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countRole("instructor")}</div>
            <p className="text-xs text-gray-500 mt-1">Certified teachers</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <ShieldCheck className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countRole("admin")}</div>
            <p className="text-xs text-gray-500 mt-1">System administrators</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">User Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Registered On</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "instructor") // ✅ Filter only instructors
              .map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3">{user.userName}</td>
                  <td className="p-3">{user.userEmail}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
