import { getNewAccessJwt, getUser, logoutUser } from "@/axios/userAxios";
import { toast } from "react-toastify";
import { setUser } from "./userSlice";

// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const response = await getUser();
  console.log("response", response);

  if (response?.status === "error") {
    return toast.error(response.message);
  }

  dispatch(setUser(response.data));
};

// AUTOLOGIN
export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (!accessJWT && refreshJWT) {
    const response = await getNewAccessJwt();

    if (response?.status === "success") {
      sessionStorage.setItem("accessJWT", response.data);
      dispatch(getUserAction());
    }
  }
  // another endpoint saying validate access token
  // check if we have access token and if yes, dispatch get user action
  dispatch(getUserAction());
};

// LOGOUT User
export const logoutUserAction = (userEmail) => async (dispatch) => {
  // call api to delete session and update user's refesh token
  const response = await logoutUser(userEmail);

  if (response?.status === "success") {
    // remove tokens from storage
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");

    // clear state
    dispatch(setUser({}));

    return toast.success(response.message);
  }
  return toast.error(response.message);
};
