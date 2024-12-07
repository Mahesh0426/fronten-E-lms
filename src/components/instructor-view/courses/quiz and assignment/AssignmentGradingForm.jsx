import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { gradeAssignmentAxios } from "@/axios/quiz and assignment/assignmentAxios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const GradeAssignmentForm = ({ assignmentId, studentId }) => {
  const { user } = useSelector((state) => state.user);

  const [score, setScore] = useState("");
  const [review, setReview] = useState("");

  const dispatch = useDispatch();

  const handleGradeSubmit = async (e) => {
    e.preventDefault();

    if (!score || score < 0) {
      return alert("Please enter a valid score.");
    }

    try {
      const payload = {
        score: score,
        review,
        gradedBy: user?._id,
      };

      const response = await gradeAssignmentAxios(
        assignmentId,
        studentId,
        payload
      );
      console.log("response grade", response);

      if (response.status === "success") {
        toast.success("Assignment graded successfully!");
      }
    } catch (error) {
      console.error("Error grading assignment:", error);
      toast.error(error.response?.data?.message || "Error grading assignment.");
    }
  };

  return (
    <div>
      <form onSubmit={handleGradeSubmit} className="space-y-4">
        <div>
          <Label className="block text-lg font-medium">Score:</Label>
          <Input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full border p-2 rounded"
            min="0"
            required
          />
        </div>
        <div>
          <Label className="block text-lg font-medium">Review:</Label>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Write a review..."
            required
          ></Textarea>
        </div>
        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Grade
        </Button>
      </form>
    </div>
  );
};

export default GradeAssignmentForm;
