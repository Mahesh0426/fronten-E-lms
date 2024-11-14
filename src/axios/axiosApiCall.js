import axios from "axios";
// import { getNewAccessJwt } from "./userAxios";

export const axiosApiCall = async (axiosParams) => {
  const {
    method,
    url,
    data,
    isPrivate = false,
    useRefreshToken = false,
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
    // if (error.message === "jwt expired") {
    //   const result = await getNewAccessJwt();

    //   if (result?.status === "success") {
    //     sessionStorage.setItem("accessJWT", result.data);

    //     return axiosApiCall(axiosParams);
    //   }
    // }

    console.log(error);

    return {
      status: "error",
      message: error.message || "Something went wrong!",
    };
  }
};
