import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "@/redux/user/userAction";
import useForm from "@/hooks/useForm";
import FormControl from "@/components/common-Input/FormControl";

const InstructorProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const initialFormData = {
    _id: user?._id,
    userName: user?.userName,
    userEmail: user?.userEmail,
    phone: user?.phone || "",
  };
  // custom hook to handle formdata changes
  const { handleOnChange, formData } = useForm(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(formData));
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
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

          <Button
            type="submit"
            className=" ml-32 w-full sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Update Info
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default InstructorProfilePage;
