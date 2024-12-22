import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  assignmentFormControls,
  initialAssignmentFormData,
} from "@/config/formConfig";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  createAssignmentAction,
  editAssignmentAction,
} from "@/redux/instructor-quiz and Assignment/AssignmentAction";
import { toast } from "react-toastify";

const AssessmentForm = ({ onClose, edittedAssignmentId }) => {
  const dispatch = useDispatch();

  // State management
  const [formData, setFormData] = useState(initialAssignmentFormData);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");

  // Redux selectors
  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course) || {};
  const { assignments } = useSelector((state) => state.assignment);

  // Extracting course fields for the dropdown
  const filteredCourses = courses?.map(({ _id, title }) => ({
    courseId: _id,
    courseName: title,
  }));

  //Populates the form with assignment data if editing.
  const populateFormForEditing = () => {
    if (edittedAssignmentId && assignments?.length > 0) {
      const assignmentToEdit = assignments.find(
        (assignment) => assignment?._id === edittedAssignmentId
      );
      if (assignmentToEdit) {
        setFormData({
          title: assignmentToEdit.title || "",
          description: assignmentToEdit.description || "",
          dueDate: new Date(assignmentToEdit.dueDate)
            .toISOString()
            .split("T")[0],
          maxScore: assignmentToEdit.maxScore || "",
        });
        setSelectedCourseId(assignmentToEdit.courseId || "");
        setSelectedCourseName(assignmentToEdit.courseName || "");
      }
    } else {
      resetForm();
    }
  };

  //Resets the form data to its initial state
  const resetForm = () => {
    setFormData(initialAssignmentFormData);
    setSelectedCourseId("");
    setSelectedCourseName("");
  };

  //update form when component mounts
  useEffect(() => {
    populateFormForEditing();
  }, [edittedAssignmentId, assignments]);

  //Handles changes in the course selection dropdown.
  const handleCourseChange = (courseId) => {
    const selectedCourse = filteredCourses.find(
      (course) => course.courseId === courseId
    );
    setSelectedCourseId(courseId);
    setSelectedCourseName(selectedCourse ? selectedCourse.courseName : "");
    handleOnChange("course", courseId);
  };

  //Updates the form data when any input field changes.
  const handleOnChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission for creating or editing an assignment.
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !selectedCourseId) {
      return toast.error("Please provide all required fields!");
    }
    const assignmentData = {
      instructorId: user?._id,
      instructorName: user?.userName,
      courseId: selectedCourseId,
      courseName: selectedCourseName,
      ...formData,
      status: edittedAssignmentId ? "Published" : "Draft",
    };
    try {
      if (edittedAssignmentId) {
        dispatch(editAssignmentAction(edittedAssignmentId, assignmentData));
      } else {
        dispatch(createAssignmentAction(assignmentData));
        setFormData(initialAssignmentFormData);
      }
      onClose();
    } catch (error) {
      toast.error("Failed to process assignment");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      {assignmentFormControls.map((field) => (
        <div key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name]}
              onChange={(e) => handleOnChange(field.name, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          ) : (
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name]}
              onChange={(e) => handleOnChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      {/* Course selection dropdown */}
      <div>
        <Label htmlFor="course">Course</Label>
        <Select
          onValueChange={(value) => handleCourseChange(value)}
          required
          value={selectedCourseId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {filteredCourses?.map((course) => (
              <SelectItem key={course.courseId} value={course.courseId}>
                {course.courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Form action buttons */}
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          type="submit"
        >
          {edittedAssignmentId ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default AssessmentForm;
