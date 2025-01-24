import { fetchOrderAsInvoice } from "@/axios/student-course/orderAxios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownToLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

const StudentInvoice = () => {
  const { user } = useSelector((state) => state.user);

  const [invoice, setInvoice] = useState([]);

  console.log("getInvoice", invoice);

  // Fetch invoice data
  const getInvoiceData = async () => {
    try {
      const response = await fetchOrderAsInvoice(user?._id);
      console.log("response", response);

      if (response.status === "success") {
        setInvoice(response.data);
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  // Generate PDF
  const downloadPDF = (invoiceData) => {
    const {
      _id,
      orderDate,
      coursePricing,
      courseTitle,
      paymentMethod,
      paymentStatus,
    } = invoiceData;

    const pdf = new jsPDF();

    // Header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(15);
    pdf.text("Invoice", 20, 20);

    // Invoice details
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Invoice number: ${_id}`, 20, 30);
    pdf.text(
      `Date of issue: ${new Date(orderDate).toLocaleDateString()}`,
      20,
      40
    );
    pdf.text(`Date due: ${new Date(orderDate).toLocaleDateString()}`, 20, 50);

    // Company contact details
    pdf.setFont("helvetica", "bold");
    pdf.text("GyanX", 20, 70);
    pdf.setFont("helvetica", "normal");
    pdf.text("support@gyanx.com", 20, 80);
    pdf.text("+61 0426 182 792", 20, 90);

    // Customer details
    pdf.setFont("helvetica", "bold");
    pdf.text("Bill to", 140, 70);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${user.userName || "Customer Name"}`, 140, 80);
    pdf.text(`${user.userEmail || "Customer Email"}`, 140, 90);
    pdf.text(`Payment Method: ${paymentMethod || "N/A"}`, 140, 100);
    pdf.text(`Payment Status: ${paymentStatus || "N/A"}`, 140, 110);

    // Amount due
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(
      `$${coursePricing} AUD due ${new Date(orderDate).toLocaleDateString()}`,
      20,
      120
    );

    // Add table header
    const startY = 140;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Description", 20, startY);
    pdf.text("Qty", 140, startY);
    pdf.text("Unit price", 160, startY);
    pdf.text("Amount", 180, startY);

    // Add horizontal line below table header
    pdf.setDrawColor(0, 0, 0);
    pdf.line(20, startY + 2, 200, startY + 2);

    // Add table row data
    pdf.setFont("helvetica", "normal");
    pdf.text(courseTitle, 20, startY + 10);
    pdf.text("1", 140, startY + 10, { align: "center" });
    pdf.text(`$${coursePricing}`, 160, startY + 10, { align: "right" });
    pdf.text(`$${coursePricing}`, 180, startY + 10, { align: "right" });

    // Subtotal and total
    const subtotalY = startY + 30;
    pdf.setFont("helvetica", "bold");
    pdf.text("Subtotal:", 160, subtotalY, { align: "right" });
    pdf.text(`$${coursePricing}`, 180, subtotalY, { align: "right" });

    pdf.text("Total:", 160, subtotalY + 10, { align: "right" });
    pdf.text(`$${coursePricing}`, 180, subtotalY + 10, { align: "right" });

    pdf.text("Amount due:", 160, subtotalY + 20, { align: "right" });
    pdf.text(`$${coursePricing} AUD`, 180, subtotalY + 20, { align: "right" });

    // Footer
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("Thank you for  purchasing Course !!.", 20, 280);

    pdf.save(`invoice.pdf`);
  };

  // useEffect to fetch invoice data when user id is available
  useEffect(() => {
    if (user?._id) {
      getInvoiceData();
    }
  }, [user?._id]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl mb-4 font-bold text-indigo-600">
          Invoice & Details
        </h1>
      </div>
      <div className="overflow-x-auto">
        <Table className="table-auto w-full border-collapse border border-gray-200 dark:text-white">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>SN</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>paymentMethod</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.length > 0 ? (
              invoice.map((inv, index) => (
                <TableRow key={inv._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(inv.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${inv.coursePricing}</TableCell>
                  <TableCell>{inv.courseTitle}</TableCell>
                  <TableCell>{inv.paymentMethod}</TableCell>
                  <TableCell>{inv.paymentStatus}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => downloadPDF(inv)}
                      className="text-indigo-600 hover:underline flex items-center"
                    >
                      <ArrowDownToLine className="mr-1" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="text-center text-gray-600 text-lg m-4 p-4"
                  colSpan={7}
                >
                  No invoice found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default StudentInvoice;
