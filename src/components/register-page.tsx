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
import userStore from "@/stores/UserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Link from "react-router-dom"

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((current) => !current);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((current) => !current);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // manual validations
    if (confirmPassword !== password) {
      setConfirmPasswordError("passwords don't match");
      setTimeout(() => setConfirmPasswordError(""), 700);
      return;
    }
    if (!password || password.length < 8) {
      setPasswordError("password cannot be empty");
      setTimeout(() => setPasswordError(""), 500);
    }
    if (!email) {
      setEmailError("email cannot be empty");
      setTimeout(() => setEmailError(""), 500);
    }
    if (!name) {
      setNameError("email cannot be empty");
      setTimeout(() => setNameError(""), 500);
    }

    // Registration logic here
    const user = await userStore.register(email, name, password, "");
    if (user) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8 md:w-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Register your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-full lg:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  minLength={3}
                  required
                  className="mt-1"
                  onChange={(e) => setName(e.target.value)}
                />
                <small className="text-red-500">{nameError}</small>
              </div>

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
                  <button
                    type="button"
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
                  </button>
                </div>
                <small className="text-red-500">{passwordError}</small>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="flex flex-row">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="mt-1"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    data-hs-toggle-password='{ "target": "#hs-toggle-password" }'
                    className="flex items-center z-20 mt-1 ml-1 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                    onClick={handleShowConfirmPassword}
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
                  </button>
                </div>
                <small className="text-red-500">{confirmPasswordError}</small>
              </div>

              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer underline font-medium text-blue-600 hover:text-blue-500"
              >
                {" "}
                Sign in
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
