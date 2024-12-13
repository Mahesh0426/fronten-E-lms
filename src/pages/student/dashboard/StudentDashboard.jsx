import React from "react";
import { Home, BookOpen, Calendar, Settings, LogOut } from "lucide-react";
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
import { Link, useLocation } from "react-router-dom";

const StudentDashboard = ({ children }) => {
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: BookOpen,
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden ">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-4 bg-white sticky top-16 z-10">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-lg font-bold">EduLearn</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/logout">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-secondary/10 p-6">
          <SidebarTrigger className="mb-4 lg:hidden" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;
