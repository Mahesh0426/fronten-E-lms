import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "@/redux/user/userAction";
import useForm from "@/hooks/useForm";
import FormControl from "@/components/common-Input/FormControl";

const UpdateInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const initialFormData = {
    _id: user?._id,
    userName: user?.userName,
    userEmail: user?.userEmail,
    phone: user?.phone || "",
    skillLevel: user?.skillLevel || "Select your level",
    learningGoals: user?.learningGoals || "select Learning goals",
    primaryInterests: user?.primaryInterests,
    language: user?.language || "select prefered language",
  };
  // custom hook to handle formdata changes
  const { handleOnChange, formData } = useForm(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(formData));
  };

  return (
    <div className=" flex  justify-center  ">
      <Card className="w-full max-w-md p-6 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit}>
          <FormControl
            label="User Name"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "text",
              name: "userName",
              value: formData.userName,
            }}
          />
          <FormControl
            label="user Email"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "email",
              name: "userEmail",
              value: formData.userEmail,
            }}
          />
          <FormControl
            label="Contact"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "number",
              name: "phone",
              placeholder: "Enter your phone number",
              value: formData.phone,
            }}
          />
          <FormControl
            label=" What is your current skill level?"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "select",
              name: "skillLevel",
              value: formData.skillLevel,
            }}
            options={[
              { value: "Select your level", label: "Select your level" },
              { value: "beginner", label: "Beginner" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
            ]}
          />
          <FormControl
            label="My learning goals"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "select",
              name: "learningGoals",
              value: formData.learningGoals,
            }}
            options={[
              {
                value: "select Learning goals",
                label: " select Learning goals",
              },
              { value: "Career-Change", label: "Career Change" },
              { value: "Skill-Improvement", label: "Skill Improvement" },
              { value: "Personal-Growth", label: "Personal Growth" },
            ]}
          />
          <FormControl
            label="My Primary Interest"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "textarea",
              name: "primaryInterests",
              placeholder: "Enter your Interest Fields",
              value: formData.primaryInterests,
            }}
          />
          <FormControl
            label="Select prefered language"
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "select",
              name: "language",
              value: formData.language,
            }}
            options={[
              { value: "English", label: "English " },
              { value: "Hindi", label: "Hindi" },
              { value: "Nepali", label: "Nepali" },
              { value: "Bengali", label: "Bengali" },
              { value: "Urdu", label: "Urdu" },
            ]}
          />

          <Button
            type="submit"
            className="  w-full  flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Update Info
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateInfo;
