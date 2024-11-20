import axios from "axios";
import { getNewAccessJwt } from "./userAxios";

export const axiosApiCall = async (axiosParams) => {
  const {
    method,
    url,
    data,
    isPrivate = false,
    useRefreshToken = false,
    onUploadProgress,
  } = axiosParams;

  const token = useRefreshToken
    ? localStorage.getItem("refreshJWT")
    : sessionStorage.getItem("accessJWT");

  const headers = {
    Authorization: isPrivate ? token : null,
  };
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      onUploadProgress,
    });

    // response.data | error message here
    if (response.data.status === "error") {
      throw { message: response.data.message };
    }

    return response.data;
  } catch (error) {
    // handle error
    // If access token is expired, try to get new access token using the refresh token
    // and use that new access token to call api
    if (error.message === "jwt expired") {
      const response = await getNewAccessJwt();

      if (response?.status === "success") {
        sessionStorage.setItem("accessJWT", response.data);

        return axiosApiCall(axiosParams);
      }
    }

    // console.log(error);

    return {
      status: "error",
      message: error.message || "Something went wrong!",
    };
  }
};
