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

//get order as invoice  by student id   | GET
export const fetchOrderAsInvoice = (studentId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/invoice/${studentId}`,
  });
};

// get revenue data for chart  | GET
export const fetchRevenueData = (instructorId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/revenue-data/${instructorId}`,
  });
};
