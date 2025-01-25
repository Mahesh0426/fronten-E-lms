import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { changePassword } from "@/axios/userAxios";
import LoadingSpinner from "../helper/loading-spinner/LoadingSpinner";
import useLoading from "@/hooks/useLoading";
import useForm from "@/hooks/useForm";
import { toast } from "react-toastify";

const initialFormData = {
  password: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange } = useForm(initialFormData);
  const { password, confirmPassword } = formData;
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [params] = useSearchParams();
  const userEmail = params.get("e");
  const token = params.get("id");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match.");
      }

      startLoading();
      const result = await changePassword({ formData, token, userEmail });

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }
      if (result?.status === "success") {
        toast.success(result.message);
        // setFormData(initialFormData);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(result.message);
    } finally {
      stopLoading();
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto ">
        <CardHeader>
          <CardTitle className="text-center text-green-600">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
            Password Reset Successful
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Choose a strong password for your gyanX account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 relative">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">
              {isLoading ? <LoadingSpinner /> : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
