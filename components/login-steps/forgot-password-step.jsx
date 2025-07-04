"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordStep({ data, updateData, onSendReset, onBack }) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!data.resetEmail.trim()) return setError("Email is required")
    if (!validateEmail(data.resetEmail)) return setError("Please enter a valid email address")

    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/send-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.resetEmail }),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.message || "Failed to send reset code.")
        toast.error(json.message)
      } else {
        toast.success("Reset code sent to your email.")
        await onSendReset(data.resetEmail) // move to next screen
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value) => {
    updateData({ resetEmail: value })
    if (error) setError("")
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
        <p className="text-muted-foreground">
          No worries! Enter your email address and we'll send you a reset code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resetEmail">Email Address</Label>
          <Input
            id="resetEmail"
            type="email"
            value={data.resetEmail}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter your email address"
            className={`bg-white text-gray-900 ${error ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 hover:border-green-500 text-green-700 border-green-400"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </Button>
        </div>
      </form>
    </div>
  )
}
