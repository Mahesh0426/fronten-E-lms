// AppInitializer.js
import { autoLoginAction } from "@/redux/user/userAction";
import { setLoading } from "@/redux/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = () => {
      dispatch(setLoading(true));

      const accessJWT = sessionStorage.getItem("accessJWT");
      const refreshJWT = localStorage.getItem("refreshJWT");

      if (accessJWT && refreshJWT) {
        try {
          dispatch(autoLoginAction());
        } catch (error) {
          console.error("Auto login failed:", error);
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    initializeApp();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
