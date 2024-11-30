import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormControl from "@/components/common-Input/FormControl";
import { courseDetailsFormControls } from "@/config/formConfig";
import { useDispatch, useSelector } from "react-redux";
import { setCourseDetailsFormData } from "@/redux/instructor-course/courseSlice";

const CourseDetails = () => {
  const { courseDetailsFormData } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  // Function to handle courseDetails change
  const CourseDetailFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setCourseDetailsFormData({
        ...courseDetailsFormData,
        [name]: value,
      })
    );
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          {courseDetailsFormControls.map((field, index) => (
            <div key={index}>
              <FormControl
                label={field.label}
                handleOnChange={CourseDetailFormChange}
                inputAttributes={{
                  type: field.type,
                  name: field.name,
                  value: courseDetailsFormData[field.name],
                  placeholder: field.placeholder,
                  required: true,
                  id: field.name,
                  as: field.type === "textarea" ? "textarea" : "text",
                }}
                options={field.options}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
