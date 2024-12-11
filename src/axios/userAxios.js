import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/user`;

//CREATE USER | POST | | SIGNUP |  PUBLIC
export const createUser = (userObj) => {
  return axiosApiCall({
    method: "post",
    url: USER_API_URL,
    data: userObj,
  });
};

// LOGIN USER | POST | LOGIN  | PUBLIC
export const loginUser = (loginData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/login`,
    data: loginData,
  });
};

// GET the user | PRIVATE
export const getUser = () => {
  return axiosApiCall({
    method: "get",
    url: USER_API_URL,
    isPrivate: true,
  });
};

// Get new access token using refresh token | GET | PRIVATE
export const getNewAccessJwt = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/accessjwt`,
    isPrivate: true,
    useRefreshToken: true,
  });
};

//LOGOUT USER | POST | PRIVATE
export const logoutUser = (userEmail) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/logout`,
    data: { userEmail },
    isPrivate: true,
  });
};

//FORGET PASSWORD | POST | Public Route
export const forgetPasswordEmail = (formData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/forget-password`,
    data: formData,
  });
};

//   CHANGE PASSWORD | PATCH
export const changePassword = (data) => {
  console.log(data);
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/change-password`,
    data: data,
  });
};
