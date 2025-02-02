import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import userStore from "@/stores/UserStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import Link from "react-router-dom"

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate()
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // Registration logic here
    const user = await userStore.register(email, name, password, "")
    if (user) navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 md:w-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Register your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Enter your details to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" type="text" autoComplete="name" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required className="mt-1" onChange={(e) => setEmail(e.target.value)} />
                <small className="text-red-500">{emailError}</small>
              </div>

              <div>
                <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" required className="mt-1" onChange={(e) => setName(e.target.value)} />
                <small className="text-red-500">{nameError}</small>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="text-red-500">{passwordError}</small>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
              <span onClick={() => navigate("/login")} className="cursor-pointer underline font-medium text-blue-600 hover:text-blue-500"> Sign in</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

