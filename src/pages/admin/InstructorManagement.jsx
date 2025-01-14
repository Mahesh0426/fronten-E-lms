import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2, PlusCircle } from "lucide-react";
import { getAllUsers, updateUserRole } from "@/axios/userAxios";
import { Input } from "@/components/ui/input";
import SignUpForm from "@/components/sign-up/SignUpForm";
import { toast } from "react-toastify";

const InstructorManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortRole, setSortRole] = useState("all");
  const [showDialouge, setShowDialogue] = useState(false);

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

  // Filter user by Name
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users by role
  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortRole === "all") return 0;
    if (a.role === sortRole && b.role !== sortRole) return -1;
    if (a.role !== sortRole && b.role === sortRole) return 1;
    return a.userName.localeCompare(b.userName);
  });

  // Handle sorting selection
  const handleSortRoleChange = (value) => {
    setSortRole(value);
  };

  // Function to toggle the user role
  const toggleRole = async (userId, selectedRole) => {
    try {
      // Ensure flat object structure
      const response = await updateUserRole({
        userId: userId,
        role: selectedRole,
      });

      if (response.status === "success") {
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: selectedRole } : user
        );
        setUsers(updatedUsers);
        toast.success(`Role updated to ${selectedRole}`);
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      toast.error("An error occurred while updating the role");
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className=" flex items-center justify-between space-x-4 mb-6">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Instructor Management
        </h1>
        {/* Add Instructor Button */}
        <Button
          onClick={() => {
            setShowDialogue(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Search and Sort */}
      <div className=" flex items-center justify-between space-x-4 mb-6">
        <div className="flex-1">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name ..."
            className="w-full"
          />
        </div>
        <div>
          <Select onValueChange={handleSortRoleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* UserList Table */}
      <div className="rounded-md border overflow-x-auto overflow-y-auto max-h-[calc(110vh-300px)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user?.userName}</TableCell>
                <TableCell>{user?.userEmail}</TableCell>
                <TableCell>{user?.phone || "N?A"}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : user.role === "instructor"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                  </span>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="relative group">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          <Edit2 className="h-6 w-6" />
                        </Button>
                        {/* Tooltip */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-md h-8 w-40 shadow-lg">
                          Edit Role
                        </div>
                      </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-50">
                      {["admin", "instructor", "user"].map((role) => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => toggleRole(user._id, role)}
                          className={`${
                            user.role === role
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {role}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* form dialogue */}
      <Dialog open={showDialouge} onOpenChange={setShowDialogue}>
        <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto p-6">
          <SignUpForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorManagementPage;
