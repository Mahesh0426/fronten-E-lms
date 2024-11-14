import { getUser } from "@/axios/userAxios";
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
