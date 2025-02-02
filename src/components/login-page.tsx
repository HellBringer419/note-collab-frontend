import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import userStore from "@/stores/UserStore"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate()
  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()
    // Login logic here
    const user = await userStore.login(email, password)
    if (user) navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 md:w-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required className="mt-1" onChange={(e) => setEmail(e.target.value)} />
                <small className="text-red-500">{emailError}</small>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="text-red-500">{passwordError}</small>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me" className="ml-2">
                    Remember me
                  </Label>
                </div>

                <div className="text-sm">
                  <Button variant="default" className="font-medium text-blue-600 hover:text-blue-500" onClick={() => navigate("/forgot-password")}>Forgot your password?</Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-600 mt-2">
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")} className="cursor-pointer underline font-medium text-blue-600 hover:text-blue-500"> Sign up</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

