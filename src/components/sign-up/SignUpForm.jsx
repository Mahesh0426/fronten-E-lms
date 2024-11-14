import React from "react";
import useForm from "@/hooks/useForm";
import { initialSignUpFormData, signUpFormControls } from "@/config/formConfig";
import useLoading from "@/hooks/useLoading";
import { Button } from "../ui/button";
import FormControl from "../common-Input/FormControl";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import { toast } from "react-toastify";
import { createUser } from "@/axios/userAxios";

//password validation
const formValidation = (formData) => {
  const { password, confirmPassword } = formData;

  return password === confirmPassword;
};

const SignUpForm = () => {
  const { formData, handleOnChange, setFormData } = useForm(
    initialSignUpFormData
  );
  const { userName, userEmail, password } = formData;
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isValidPassword = formValidation(formData);
    if (!isValidPassword) {
      return toast.error("Password and confirm password dose not match!!");
    }
    startLoading();

    //call api to create user in Db
    const result = await createUser({
      userName,
      userEmail,
      password,
    });
    stopLoading();

    if (result?.status === "error") {
      return toast.error(result.message || "cannot create user");
    }

    setFormData(initialSignUpFormData);
    toast.success(result.message);
  };

  return (
    <div className="min-h-screen w-full p-4 md:px-6 md:py-12 lg:px-8">
      <div className="w-full max-w-sm mx-auto">
        <img
          className="mx-auto h-10 w-auto"
          src="/gyanX.svg"
          alt="Your Company"
        />
        <h2 className="mt-8 text-center text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 w-full max-w-sm mx-auto">
        <form onSubmit={handleOnSubmit} className="space-y-4">
          {signUpFormControls.map((field, index) => (
            <FormControl
              key={index}
              label={field.label}
              handleOnChange={handleOnChange}
              inputAttributes={{
                type: field.type,
                name: field.name,
                value: formData[field.name],
                placeholder: field.placeholder,
                required: true,
                id: field.name,
              }}
            />
          ))}

          <div className="mt-6">
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Sign up"}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have Account?
          <a
            href="/login"
            className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
