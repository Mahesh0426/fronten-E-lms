import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/order`;

//CREATE Enroll | POST | | ENROLL |  Private
export const createOrder = (paymentPayload) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/create`,
    data: paymentPayload,
  });
};

// capturePaymentAndFinalizeOrder | POST | Public
export const capturePaymentAndFinalizeOrder = (paymentId, payerId, orderId) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/capture`,
    data: { paymentId, payerId, orderId },
  });
};
