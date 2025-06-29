"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import {toast} from "sonner"

export default function EmailEntryStep({ data, updateData, onEmailSent }) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(data.email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")
    toast.dismiss()

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      })
      const result = await res.json()

      if (!result.success) {
        setError(result.message || "Failed to send verification code.")
        toast.error(result.message || "Failed to send verification code.")
        setIsLoading(false)
        return
      }

      toast.success("Verification code sent to your email!")
      onEmailSent()
    } catch (err) {
      setError("Failed to send verification code. Please try again.")
      toast.error("Failed to send verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value) => {
    updateData({ email: value })
    if (error) setError("")
  }

  return (
    <div className="space-y-6">
      {/* Header with green circle icon */}
      <div className="text-center space-y-2">
        <div className="relative mx-auto w-12 h-12 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center z-10 relative">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-md opacity-50" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Enter your email</h1>
        <p className="text-muted-foreground">
          We'll send you a verification code to confirm your email address
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter your email address"
            className={`bg-white text-gray-900 border ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Button */}
        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Sending Code..." : "Send Verification Code"}
        </Button>
      </form>
    </div>
  )
}