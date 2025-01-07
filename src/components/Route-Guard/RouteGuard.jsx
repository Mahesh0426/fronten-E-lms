// import { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const RouteGuard = ({ element }) => {
//   const { user } = useSelector((state) => state.user);
//   const isAuthenticated = user?._id;
//   console.log(isAuthenticated);

//   const location = useLocation();

//   // Check if User is Not Authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   // Check if User is Authenticated but Not Instructor
//   if (
//     isAuthenticated &&
//     user?.role !== "instructor" &&
//     (location.pathname.includes("instructor") ||
//       location.pathname.includes("/login"))
//   ) {
//     return <Navigate to="/home" />;
//   }

//   // Check if User is Instructor but Not on Instructor Route
//   if (
//     isAuthenticated &&
//     user?.role === "instructor" &&
//     !location.pathname.includes("instructor")
//   ) {
//     return <Navigate to="/instructor" />;
//   }

//   // Check if User is Admin
//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     !location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/admin" />;
//   }
//   return <Fragment>{element}</Fragment>;
// };

// export default RouteGuard;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PageLoadingSpinner from "../helper/PageLoadingSpinner";

const RouteGuard = ({ element }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const isAuthenticated = user?._id;
  const location = useLocation();

  // If loading, return the centered spinner
  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect instructors to the  / instructor
  if (
    isAuthenticated &&
    user?.role !== "instructor" &&
    location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/home" replace />;
  }

  // Instructors: Redirect to /instructor if they access non-instructor routes
  if (
    user?.role === "instructor" &&
    !location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/instructor" replace />;
  }
  // Admin: Redirect to /admin if they try to access non-admin routes
  if (user?.role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }

  // Redirect regular users to the home page if they try to access restricted routes
  if (
    user?.role === "user" &&
    (location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/instructor"))
  ) {
    return <Navigate to="/home" replace />;
  }
  return <>{element}</>;
};

export default RouteGuard;
