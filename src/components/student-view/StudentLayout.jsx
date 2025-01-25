import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";
import { useSelector } from "react-redux";

const StudentLayout = () => {
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    // <div>
    //   {!location.pathname.includes("course-progress") ? <Header /> : null}

    //   <div className="pt-16">
    //     <Outlet />
    //   </div>
    //   {!location.pathname.includes("profile") ? <Footer /> : null}
    // </div>

    <div
      className={`min-h-screen ${
        isDarkMode ? "dark" : ""
      } bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      {/* Conditionally Render Header */}
      {!location.pathname.includes("course-progress") && <Header />}

      {/* Main Content */}
      <div className="pt-16">
        <Outlet />
      </div>

      {/* Conditionally Render Footer */}
      {!location.pathname.includes("profile") && <Footer />}
    </div>
  );
};

export default StudentLayout;
