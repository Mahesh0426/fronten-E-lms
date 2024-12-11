import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, ArrowLeft, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import useForm from "@/hooks/useForm";
import { forgetPasswordEmail } from "@/axios/userAxios";
import { toast } from "react-toastify";

const initialFormData = {
  email: "",
};

const ForgetPassword = () => {
  const { formData, handleOnChange } = useForm(initialFormData);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgetPasswordEmail(formData);
    console.log(result);
    if (result.status === "error") {
      toast.error(result.message);
    }
    if (result.status === "success") {
      toast.success(result.message);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-green-600">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
              Check Your Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">
              We've sent a password reset link to{" "}
              <strong>{formData.email}</strong>. Please check your inbox and
              follow the instructions to reset your password.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              If you don't see the email, check your spam folder.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    name="email"
                    type="email"
                    className="pl-10"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleOnChange(e)}
                    required
                  />
                </div>
              </div>

              <Button className="w-full" type="submit">
                Send reset link
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link to="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgetPassword;
