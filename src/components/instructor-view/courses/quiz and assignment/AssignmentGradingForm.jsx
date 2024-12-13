import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { gradeAssignmentAxios } from "@/axios/quiz and assignment/assignmentAxios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const GradeAssignmentForm = ({
  assignmentId,
  studentId,
  maxScore,
  score: initialScore = "",
  review: initialReview = "",
  onSuccess,
  onCancel,
}) => {
  const { user } = useSelector((state) => state.user);

  const [score, setScore] = useState(initialScore);
  const [review, setReview] = useState(initialReview);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure that the form fields update when props change
  useEffect(() => {
    setScore(initialScore);
  }, [initialScore]);

  useEffect(() => {
    setReview(initialReview);
  }, [initialReview]);

  //function to handle grade submit
  const handleGradeSubmit = async (e) => {
    e.preventDefault();

    if (!score || score < 0 || score > maxScore) {
      return toast.error(`Score must be between 0 and ${maxScore}`);
    }

    setIsSubmitting(true);
    try {
      const payload = {
        score,
        review,
        gradedBy: user?._id,
        gradingDate: new Date().toISOString(),
      };

      const response = await gradeAssignmentAxios(
        assignmentId,
        studentId,
        payload
      );

      if (response.status === "success") {
        toast.success(
          initialScore || initialReview
            ? "Grade updated successfully!"
            : "Grade submitted successfully!"
        );

        if (onSuccess) onSuccess(payload);
        if (onCancel) onCancel();
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      toast.error(
        error.response?.data?.message || "Error updating grade in the database."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleGradeSubmit} className="space-y-4">
      <div>
        <Label className="block text-lg font-medium">Score:</Label>
        <Input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full border p-2 rounded"
          min="0"
          max={maxScore}
          placeholder={`Enter a score (0 - ${maxScore})`}
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
          placeholder="Write feedback for the student..."
          required
        ></Textarea>
      </div>
      <div className="flex space-x-4">
        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : initialScore !== ""
            ? "Update Grade"
            : "Submit Grade"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default GradeAssignmentForm;
