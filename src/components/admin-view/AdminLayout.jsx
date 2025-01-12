import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUserAction } from "@/redux/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import InstructorProfilePage from "@/pages/Instructor/setting/InstructorSetting";
import InstructorManagementPage from "@/pages/admin/InstructorManagement";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      value: "Dashboard",
      component: <AdminDashboardPage />,
    },
    {
      icon: Users,
      label: "Instructor Management",
      value: "Instructor",
      component: <InstructorManagementPage />,
    },
    {
      icon: Settings,
      label: "Settings",
      value: "Settings",
      component: <InstructorProfilePage />,
    },
  ];

  const { user } = useSelector((state) => state.user);
  const { userEmail, userName } = user || {};

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAction(userEmail));
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="p-6">
          <header className="mb-6 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8" />
            <span className="text-xl font-bold">gyanX Admin</span>
          </header>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={activeTab === item.value ? "secondary" : "ghost"}
              onClick={() => setActiveTab(item.value)}
              className={`w-full justify-start px-4 py-3 text-left ${
                activeTab === item.value
                  ? "bg-white text-blue-800"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 w-full px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full p-4 flex items-center space-x-3 justify-start text-white hover:bg-blue-700"
              >
                <div className="h-10 w-10 rounded-full font-bold bg-yellow-500 text-blue-800 text-xl flex justify-center items-center">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-blue-200">{userEmail}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <main className="flex-1 p-8 relative">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {menuItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.component}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default AdminLayout;
