import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/user`;

//Create User | PUBLIC
export const createUser = (userObj) => {
  return axiosApiCall({
    method: "post",
    url: USER_API_URL,
    data: userObj,
  });
};
//  Login User |  PUBLIC
export const loginUser = (loginData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/login`,
    data: loginData,
  });
};

// Get user  | PRIVATE
export const getUser = () => {
  return axiosApiCall({
    method: "get",
    url: USER_API_URL,
    isPrivate: true,
  });
};
