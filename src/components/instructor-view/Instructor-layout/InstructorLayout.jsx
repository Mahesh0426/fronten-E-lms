import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart,
  Lightbulb,
  Settings,
  LogOut,
  CheckSquare,
  BrainCircuit,
  NotebookTabs,
  Flag,
  GraduationCap,
  User,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUserAction } from "@/redux/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import InstructorDashboardPage from "../../../pages/Instructor/Dashboard/InstructorDashboardPage";
import InstructorAllCoursePage from "../../../pages/Instructor/course-management/InstructorAllCoursePage";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import QuizAndAssignmentPage from "../../../pages/Instructor/quiz-assignment/Quize&AssignmentPage";
import GradebookTable from "@/pages/Instructor/student-management/studentgradebook";
import { useNavigate } from "react-router-dom";
import ActivityLogPage from "@/pages/Instructor/Activity-Log/ActivityLog.jsx.jsx";
import InstructorProfilePage from "@/pages/Instructor/setting/InstructorSetting";
import Analytics from "@/pages/Instructor/analytics/InstructorAnalytics";

const InstructorLayout = () => {
  const [activeTab, setActiveTab] = useState("Courses");
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      value: "Dashboard",
      component: <InstructorDashboardPage />,
    },
    {
      icon: BookOpen,
      label: "Course Management",
      value: "Courses",
      component: <InstructorAllCoursePage />,
    },
    {
      icon: CheckSquare,
      label: "Quiz and Assessment",
      value: "Quizzes",
      component: <QuizAndAssignmentPage />,
    },

    {
      icon: Users,
      label: "Student Management",
      value: "Students",
      component: <GradebookTable />,
    },
    {
      icon: BarChart,
      label: "Analytics",
      value: "Analytics",
      component: <Analytics />,
    },

    {
      icon: NotebookTabs,
      label: "Activity Logs",
      value: "Activity Logs",
      component: <ActivityLogPage />,
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

  // LOGOUT FEATURE
  const handleLogout = () => {
    dispatch(logoutUserAction(userEmail));
    navigate("/login");
  };

  return (
    <div className=" flex min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <aside className="w-64 bg-blue-100 shadow-md">
        <div className="p-4">
          {/* header */}
          <header className="mb-3 flex flext-start">
            <GraduationCap className="mr-2 h-6 w-6" />
            <span className="font-bold">gyanX Instructor</span>
          </header>
        </div>

        {/* sidebar item */}
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={activeTab === item.value ? "secondary" : "ghost"}
              onClick={() => setActiveTab(item.value)}
              className="w-full justify-start px-4 py-2 text-left text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* footer */}

        <div className="absolute bottom-3  w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-64 p-4 flex items-center space-x-2 justify-start"
              >
                <div className="h-10 w-10 rounded-full font-bold bg-yellow-500 text-white text-2xl flex justify-center items-center">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-blue-800">{userEmail}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="top" sideOffset={30} className="w-56 ">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Settings2 /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      {/*   main content */}
      <main className="flex-1 p-8 relative">
        {/* tab  content  */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {menuItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.component !== null ? item.component : null}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default InstructorLayout;
