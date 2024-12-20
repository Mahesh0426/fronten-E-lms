import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const StudentInvoice = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl mb-4 font-bold text-indigo-600">
          Invoice & Details
        </h1>
      </div>
      <div className="overflow-x-auto">
        <Table className="table-auto w-full border-collapse border border-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-left p-2">Date</TableHead>
              <TableHead className="text-left p-2">Price</TableHead>
              <TableHead className="text-left p-2">Course</TableHead>
              <TableHead className="text-left p-2">paymentMethod</TableHead>
              <TableHead className="text-left p-2">Status</TableHead>
              <TableHead className="text-left p-2">Download</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </>
  );
};

export default StudentInvoice;
