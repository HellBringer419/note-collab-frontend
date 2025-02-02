import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import userStore from "@/stores/UserStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Forgot password logic here
    userStore.forgotPassword(email)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 md:w-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Reset your password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-full">
        <Card>
          <CardHeader>
            <CardTitle>Forgot password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required className="mt-1" onChange={(e) => setEmail(e.target.value)} />
              </div>

              <Button type="submit" className="w-full">
                Send reset link
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-600 mt-2">
              Remember your password?{" "}
              <span onClick={() => navigate("/login")} className="cursor-pointer underline font-medium text-blue-600 hover:text-blue-500"> Sign in</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

