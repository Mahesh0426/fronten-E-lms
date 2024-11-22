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

  // Check if User is Not Authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if User is Instructor but Not on Instructor Route
  if (
    isAuthenticated &&
    user?.role !== "instructor" &&
    location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/home" replace />;
  }

  return <>{element}</>;
};

export default RouteGuard;
