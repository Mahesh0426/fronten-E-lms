import { autoLoginAction } from "@/redux/user/userAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RouteGuard = (props) => {
  const { children } = props;

  const location = useLocation();

  const { user } = useSelector((state) => state.user);

  // Check if User is Not Authenticated
  if (!user?._id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Check if User is Authenticated but Not Instructor
  if (
    user.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/login"))
  ) {
    return <Navigate to="/home" />;
  }

  // Check if User is Instructor but Not on Instructor Route
  if (user.role === "instructor" && !location.pathname.includes("instructor")) {
    return <Navigate to="/instructor" />;
  }

  return children;
};

export default RouteGuard;
