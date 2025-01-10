import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";

const StudentLayout = () => {
  const location = useLocation();

  return (
    <div>
      {!location.pathname.includes("course-progress") ? <Header /> : null}

      <div className="pt-16">
        <Outlet />
      </div>
      {!location.pathname.includes("profile") ? <Footer /> : null}
    </div>
  );
};

export default StudentLayout;
