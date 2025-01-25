import { assets } from "@/assets/asset";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogInIcon,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  Tv,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "@/redux/user/userAction";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { setSearch } from "@/redux/student-course/studentCourseSlice";
import { toggleDarkMode } from "@/redux/dark-mode/darkModeSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //redut selector
  const {
    user: { _id, userName, userEmail, role },
  } = useSelector((state) => state.user);
  const isAuthenticated = _id;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  //state management
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // const [darkmode, setDarkMode] = useState(() => {
  //   return localStorage.getItem("theme") || "light";
  // });

  // handle on search
  const handleOnSearch = (e) => {
    e.preventDefault();
    // Redirect to SearchPage  | /search path
    navigate(`/search?query=${encodeURIComponent(searchInput)}`);
  };

  //function to handle logout
  const handleLogout = () => {
    dispatch(logoutUserAction(userEmail));
    navigate("/login");
  };

  // // useEffect to update dark mode
  // useEffect(() => {
  //   if (darkmode == "dark") document.body.classList.add("dark");
  //   else document.body.classList.remove("dark");

  //   // Save the current theme to localStorage
  //   localStorage.setItem("theme", darkmode);
  // }, [darkmode]);

  // // Handle dark mode toggle
  // const handleDarkModeToggle = () => {
  //   setDarkMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  // };

  return (
    <header className="fixed top-0 z-50 dark:bg-gray-900 bg-white shadow-md w-full ">
      <div className=" px-4 sm:px-6">
        {/* Main header content */}
        <div className="flex justify-between items-center h-16">
          {/* Desktop: Left - Logo and Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home">
              <img
                src={assets.logo}
                alt="logo"
                className="h-19 w-23 hover:cursor-pointer"
              />
            </Link>
            <nav className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 dark:text-white hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/aboutUs"
                className="text-gray-600  dark:text-white hover:text-indigo-600 transition-colors"
              >
                About Us
              </Link>

              <Link
                to="/courses"
                className="flex items-center  dark:text-white text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Explore Courses
              </Link>
            </nav>
          </div>

          {/* Desktop: Right section */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center relative">
              <form onSubmit={handleOnSearch}>
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  placeholder="Search courses..."
                  className="w-64 pl-10 pr-4 py-2 rounded-full   dark:text-white border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <Search className="h-5 w-5 text-gray-400  dark:text-white absolute left-3 top-1/2 transform -translate-y-1/2" />
              </form>
            </div>

            {isAuthenticated && role === "user" ? (
              <Link
                to="/student-courses"
                className="flex items-center  dark:text-white text-white-600 hover:text-indigo-600 transition-colors"
              >
                <Tv className="h-4 w-4 mr-1" />
                My Courses
              </Link>
            ) : null}

            {/* User Profile or Sign In dropdown */}

            {isAuthenticated && role === "user" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-transparent-hover focus:bg-transparent-hover"
                  >
                    <div className="h-10 w-10 rounded-full font-bold bg-yellow-500 text-white text-2xl flex justify-center items-center">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className=" dark:bg-gray-900"
                    onClick={() => navigate("/profile")}
                  >
                    <User /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className=" dark:bg-gray-900"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="px-3 py-1 text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <LogInIcon className="h-4 w-4" /> login
              </Button>
            )}
            {/* Dark Mode Toggle */}
            <Button
              onClick={handleDarkModeToggle}
              className="bg-transparent border-none shadow-none text-current hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-full focus:outline-none focus:ring-0"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5  dark:text-white" />
              ) : (
                <Moon className="h-5 w-5 " />
              )}
            </Button>
          </div>

          {/* Mobile: Left - Hamburger Menu */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </button>
          </div>

          {/* Mobile: Center - Logo */}
          <div className="md:hidden flex justify-center">
            <Link to="/home">
              <img
                src={assets.logo}
                alt="logo"
                className="h-19 w-22 hover:cursor-pointer"
              />
            </Link>
          </div>
          {/* Mobile: Right - Sign In Button */}
          <div className="md:hidden">
            {!_id ? (
              <Button
                onClick={() => navigate("/login")}
                className="px-3 py-1 text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <LogInIcon className="h-4 w-4" />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-transparent-hover focus:bg-transparent-hover p-0"
                  >
                    <div className="h-8 w-8 rounded-full font-bold bg-yellow-500 text-white text-xl flex justify-center items-center">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {/* Dark Mode Toggle */}
            <Button
              onClick={handleDarkModeToggle}
              className="bg-transparent border-none shadow-none text-current hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-full focus:outline-none focus:ring-0"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5  dark:text-white" />
              ) : (
                <Moon className="h-5 w-5 " />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="flex flex-col space-y-4 py-4 ">
              <Link
                to="/"
                className="px-4 text-gray-600 hover:text-indigo-600 transition-colors dark:text-white"
              >
                Home
              </Link>
              <Link
                to="/aboutUs"
                className="px-4 text-gray-600 hover:text-indigo-600 transition-colors dark:text-white"
              >
                About Us
              </Link>
              <Link
                to="/courses"
                className="px-4 text-gray-600 hover:text-indigo-600 transition-colors dark:text-white"
              >
                Explore Courses
              </Link>

              {isAuthenticated && role === "user" ? (
                <Link
                  to="/student-courses"
                  className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors dark:text-white"
                >
                  <Tv className="h-4 w-4 mr-1" />
                  My Courses
                </Link>
              ) : null}

              <div className="px-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white"
                  />
                  <Search className="h-5 w-5 text-gray-400 dark:text-white absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
