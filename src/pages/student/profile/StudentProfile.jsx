import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  User,
  ChartNoAxesCombined,
  CircleUser,
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
import StudentDashboard from "./StudentDashboard";
import UpdateInfo from "./UpdateInfo";
import StudentSetting from "./StudentSetting";
import StudentPerformance from "./StudentPerformance";

const StudentProfile = () => {
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
      <div className="flex w-full  h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-purple-100 ">
        <Sidebar className=" bg-blue-300 shadow-md ">
          <SidebarHeader className="border-b px-6 py-4 bg-white sticky top-16 z-10">
            <div className="flex items-center  space-x-2">
              <CircleUser className="h-8 w-8 " />
              <span className="text-lg font-bold">{userName}</span>
            </div>
          </SidebarHeader>
          <SidebarHeader className="border-b px-6 py-4 bg-white sticky top-16 z-10">
            <div className="flex items-center flex-col space-x-2">
              <CircleUser className="h-10 w-10" />
              <span className="text-lg font-bold">{userName}</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    isActive={activePage === item.value}
                    onClick={() => setActivePage(item.value)}
                    className="flex items-center"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-[3]  w-full overflow-y-auto bg-secondary/10 p-6">
          <SidebarTrigger className="mb-4 lg:hidden" />
          {/* Render the active component */}
          {menuItems.find((item) => item.value === activePage)?.component}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StudentProfile;
