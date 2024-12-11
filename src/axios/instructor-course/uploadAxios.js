import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/upload`;

// POST | upload a file | create
export const uploadMedia = (FormData, onProgressCallBack) => {
  return axiosApiCall({
    method: "post",
    url: USER_API_URL,
    data: FormData,
    onUploadProgress: (progressEvent) => {
      const progressCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (onProgressCallBack) {
        onProgressCallBack(progressCompleted);
      }
    },
  });
};

/// DELETE | delete a file | delete
export const mediaDelete = (publicId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/delete/${publicId}`,
  });
};
