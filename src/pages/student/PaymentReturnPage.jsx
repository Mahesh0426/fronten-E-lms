import { capturePaymentAndFinalizeOrder } from "@/axios/orderAxios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaypalPaymentReturnPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  // Handle payment return and finalize order using PayPal API
  useEffect(() => {
    if (paymentId && payerId) {
      const capturePayment = async () => {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        try {
          const response = await capturePaymentAndFinalizeOrder(
            paymentId,
            payerId,
            orderId
          );

          if (response?.status === "success") {
            sessionStorage.removeItem("currentOrderId");
            // window.location.href = "/student-courses";
            navigate("/student-courses");
          } else {
            console.log("Payment capture failed:", response);
          }
        } catch (error) {
          console.error("Error capturing payment:", error);
        }
      };
      capturePayment();
    }
  }, [paymentId, payerId, navigate]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Processing payment please wait..</CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};

export default PaypalPaymentReturnPage;
