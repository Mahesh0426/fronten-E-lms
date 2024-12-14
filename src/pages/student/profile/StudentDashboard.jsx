import React from "react";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const {
    user: { userName },
  } = useSelector((state) => state.user);

  return (
    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
      Welcome Back !! {userName}
    </h1>
  );
};

export default StudentDashboard;
