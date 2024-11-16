"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const calculatePasswordStrength = () => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength += 25;
    if (pass.match(/\d/)) strength += 25;
    if (pass.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

  const handlePasswordChange = () => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmit = async () => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength < 75) {
      setError("Password is not strong enough");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your new password"
                  required
                />
                <Progress value={passwordStrength} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Password strength:{" "}
                  {passwordStrength === 100
                    ? "Strong"
                    : passwordStrength >= 50
                    ? "Medium"
                    : "Weak"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                />
              </div>
              {error && (
                <div className="flex items-center text-red-600" role="alert">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
            <Button
              className="w-full mt-6"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-muted-foreground w-full">
            Password must be at least 8 characters long and include uppercase,
            lowercase, number, and special character.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
