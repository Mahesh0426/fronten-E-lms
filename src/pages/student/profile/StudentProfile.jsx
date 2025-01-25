import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  User,
  ChartNoAxesCombined,
  CircleUser,
  ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MyCoursePage from "../course/MyCoursePage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "@/redux/user/userAction";
import StudentDashboard from "../../../components/student-view/profile-component/StudentDashboard";
import UpdateInfo from "../../../components/student-view/profile-component/UpdateInfo";
import StudentSetting from "../../../components/student-view/profile-component/StudentSetting";
import StudentPerformance from "../../../components/student-view/profile-component/StudentPerformance";
import StudentInvoice from "@/components/student-view/profile-component/StudentInvoice";

const StudentProfilePage = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const {
    user: { userEmail, userName },
  } = useSelector((state) => state.user);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      value: "Dashboard",
      component: <StudentDashboard />,
    },
    {
      icon: BookOpen,
      label: "Courses",
      value: "Courses",
      component: <MyCoursePage />,
    },
    {
      icon: ChartNoAxesCombined,
      label: "My Performance",
      value: "My Performance",
      component: <StudentPerformance />,
    },
    {
      icon: User,
      label: "Update Info",
      value: "Update Info",
      component: <UpdateInfo />,
    },
    {
      icon: ReceiptText,
      label: "Invoice",
      value: "invoice",
      component: <StudentInvoice />,
    },
    {
      icon: Settings,
      label: "Settings",
      value: "Settings",
      component: <StudentSetting />,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAction(userEmail));
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-purple-100 dark:bg-gray-900">
        <Sidebar className="bg-blue-300 shadow-md dark:bg-gray-800">
          <SidebarHeader className="border-b px-6 py-4 bg-white dark:bg-gray-900 sticky top-16 z-10">
            <div className="flex items-center space-x-2">
              <CircleUser className="h-8 w-8 text-gray-800 dark:text-gray-100" />
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {userName}
              </span>
            </div>
          </SidebarHeader>
          <SidebarHeader className="border-b px-6 py-4 bg-white dark:bg-gray-900 sticky top-16 z-10">
            <div className="flex items-center flex-col space-x-2">
              <CircleUser className="h-10 w-10 text-gray-800 dark:text-gray-100" />
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {userName}
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="dark:bg-gray-900 dark:border-gray-800 ">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    isActive={activePage === item.value}
                    onClick={() => setActivePage(item.value)}
                    className="flex items-center text-gray-900 dark:text-gray-100  "
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="dark:bg-gray-900">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-800 dark:text-gray-100  "
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-[3] w-full overflow-y-auto bg-secondary/10 dark:bg-gray-800 p-6">
          <SidebarTrigger className="mb-4 lg:hidden" />
          {/* Render the active component */}
          {menuItems.find((item) => item.value === activePage)?.component}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StudentProfilePage;
