import React from "react";
import { Button } from "../ui/button";
import useForm from "@/hooks/useForm";
import { initialLoginFormData, LogInFormControls } from "@/config/formConfig";
import useLoading from "@/hooks/useLoading";
import FormControl from "../common-Input/FormControl";
import { toast } from "react-toastify";
import { loginUser } from "@/axios/userAxios";
import { useDispatch } from "react-redux";
import { getUserAction } from "@/redux/user/userAction";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const LoginForm = () => {
  const { formData, handleOnChange, setFormData } =
    useForm(initialLoginFormData);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    //call api to login the user
    const result = await loginUser(formData);

    stopLoading();
    if (result?.status === "error") {
      return toast.error(result.message);
    }
    // If success, we store the accessJWT and refresh JWT in session storage and local storage respectively
    sessionStorage.setItem("accessJWT", result.data.accessJWT);
    localStorage.setItem("refreshJWT", result.data.refreshJWT);

    // dispatch action to get the user
    dispatch(getUserAction());

    // if login success, clear the form and show success message
    toast.success(result.message);
    setFormData(initialLoginFormData);
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
          Login to your account
        </h2>
      </div>

      <div className="mt-12 w-full max-w-sm mx-auto">
        <form onSubmit={handleOnSubmit} className="space-y-4">
          {LogInFormControls.map((field, index) => (
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
              {isLoading ? <LoadingSpinner /> : "Login"}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Forget password ?
          <a
            href="/forget-password"
            className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500 underline"
          >
            Click here
          </a>
        </p>
        <p className="mt-1 text-center text-sm text-gray-500">
          Don't have Account?
          <a
            href="/signup"
            className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500 "
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
