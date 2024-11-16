import { getNewAccessJwt, getUser, logoutUser } from "@/axios/userAxios";
import { toast } from "react-toastify";
import { setUser } from "./userSlice";

// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const result = await getUser();
  console.log("result", result);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setUser(result.data));
};

// AUTOLOGIN
export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (!accessJWT && refreshJWT) {
    const result = await getNewAccessJwt();

    if (result?.status === "success") {
      sessionStorage.setItem("accessJWT", result.data);
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
  const result = await logoutUser(userEmail);

  if (result?.status === "success") {
    // remove tokens from storage
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");

    // clear state
    dispatch(setUser({}));

    return toast.success(result.message);
  }
  return toast.error(result.message);
};
