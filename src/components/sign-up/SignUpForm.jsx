import React, { useState } from "react";
import useForm from "@/hooks/useForm";
import { initialSignUpFormData, signUpFormControls } from "@/config/formConfig";
import useLoading from "@/hooks/useLoading";
import { Button } from "../ui/button";
import FormControl from "../common-Input/FormControl";
import LoadingSpinner from "../helper/loading-spinner/LoadingSpinner";
import { toast } from "react-toastify";
import { createUser } from "@/axios/userAxios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isValidPassword = formValidation(formData);
    if (!isValidPassword) {
      return toast.error("Password and confirm password dose not match!!");
    }
    startLoading();

    //call api to create user in Db
    const response = await createUser({
      userName,
      userEmail,
      password,
    });
    stopLoading();

    if (response?.status === "error") {
      return toast.error(response.message || "cannot create user");
    }

    setFormData(initialSignUpFormData);
    toast.success(response.message);
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
            <div key={index}>
              {field.name === "password" || field.name === "confirmPassword" ? (
                <div className="relative">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <div className="relative">
                    <Input
                      type={
                        field.name === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      placeholder={field.placeholder}
                      required
                      id={field.name}
                      className="pr-10"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent cursor-pointer "
                      onClick={() =>
                        field.name === "password"
                          ? setShowPassword(!showPassword)
                          : setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {field.name === "password" ? (
                        showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )
                      ) : showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <FormControl
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
              )}
            </div>
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
