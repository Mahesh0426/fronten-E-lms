import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useForm from "@/hooks/useForm";
import { initialLoginFormData, LogInFormControls } from "@/config/formConfig";
import useLoading from "@/hooks/useLoading";
import FormControl from "../common-Input/FormControl";
import { toast } from "react-toastify";
import { loginUser } from "@/axios/userAxios";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../helper/loading-spinner/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/user/userSlice";
import { getUserAction } from "@/redux/user/userAction";

const LoginForm = () => {
  const { formData, handleOnChange, setFormData } =
    useForm(initialLoginFormData);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //function to handle login submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    try {
      const response = await loginUser(formData);

      if (response?.status === "error") {
        toast.error(response.message);
        return;
      }

      sessionStorage.setItem("accessJWT", response.data.accessJWT);
      localStorage.setItem("refreshJWT", response.data.refreshJWT);

      // Dispatch action to get the user
      dispatch(getUserAction());

      toast.success(response.message);
      setFormData(initialLoginFormData);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      stopLoading();
    }
  };

  // Logic to handle what should happen if a user is logged in
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?._id) {
      navigate("/instructor");
    }
  }, [user?._id, navigate]);

  // // If user is logged in, redirect to the instructor dashboard
  // useEffect(() => {
  //   // if user exists [logged in], navigate to instructor homepage
  //   if (user?._id) {
  //     navigate("/instructor");
  //   }
  //   // if no tokens, keep them in login page
  //   if (
  //     !sessionStorage.getItem("accessJWT") &&
  //     !localStorage.getItem("refreshJWT")
  //   ) {
  //     return;
  //   }
  //   // if not try auto login
  //   if (!user?._id) {
  //     dispatch(autoLoginAction());
  //   }
  // }, [user?._id, navigate, dispatch]);

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
        <form onSubmit={handleOnSubmit} className="space-y-4" autoComplete="on">
          {LogInFormControls.map((field, index) => (
            <div key={index}>
              {field.name === "password" ? (
                <div className="relative">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      placeholder={field.placeholder}
                      required
                      id={field.name}
                      className="pr-10"
                      autoComplete="current-password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
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
                    autoComplete: field.autoComplete,
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
              {isLoading ? <LoadingSpinner /> : "Login"}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Forgot password?
          <a
            href="/forget-password"
            className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500 underline"
          >
            Click here
          </a>
        </p>
        <p className="mt-1 text-center text-sm text-gray-500">
          Don't have an account?
          <a
            href="/signup"
            className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
