import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userStore from "@/stores/UserStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, _setEmailError] = useState("");
  const [passwordError, _setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((current) => !current);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
    try {
      const user = await userStore.login(email, password);
      if (user) navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
        setTimeout(() => setApiError(""), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8 md:w-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-full lg:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small className="text-red-500">{emailError}</small>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="flex flex-row">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    minLength={8}
                    maxLength={70}
                    required
                    className="mt-1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    data-hs-toggle-password='{ "target": "#hs-toggle-password" }'
                    className="flex items-center z-20 mt-1 ml-1 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                    onClick={handleShowPassword}
                  >
                    {/* SVG for password eye */}
                    <svg
                      className="shrink-0 size-3.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        className="hs-password-active:hidden"
                        d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                      ></path>
                      <path
                        className="hs-password-active:hidden"
                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                      ></path>
                      <path
                        className="hs-password-active:hidden"
                        d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                      ></path>
                      <line
                        className="hs-password-active:hidden"
                        x1="2"
                        x2="22"
                        y1="2"
                        y2="22"
                      ></line>
                      <path
                        className="hidden hs-password-active:block"
                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      ></path>
                      <circle
                        className="hidden hs-password-active:block"
                        cx="12"
                        cy="12"
                        r="3"
                      ></circle>
                    </svg>
                    {/* END OF SVG for password eye */}
                  </Button>
                </div>
                <small className="text-red-500">{passwordError}</small>
              </div>

              <small className="text-red-500">{apiError}</small>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <p className="text-center text-sm text-gray-600 mt-2">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="cursor-pointer underline font-medium text-blue-600 hover:text-blue-500"
              >
                {" "}
                Sign up
              </span>
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              <span
                onClick={() => navigate("/forgot-password")}
                className="cursor-pointer underline font-medium text-blue-600 hover:text-blue-500"
              >
                {" "}
                Forgot your password?
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
