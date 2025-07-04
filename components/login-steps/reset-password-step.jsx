"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, RotateCcw } from "lucide-react"
import { toast } from "sonner"

export default function ResetPasswordStep({
  data,
  updateData,
  onResetPassword,
  onBack,
  email,
}) {
  const [errors, setErrors] = useState({})
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const [countdown, setCountdown] = useState(240) // 4 minutes = 240 seconds
  const [resendTrigger, setResendTrigger] = useState(0)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef([])
  const [codes, setCodes] = useState(["", "", "", "", "", ""])

  // ⏱ Format countdown like mm:ss
  const formatCountdown = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0")
    const secs = String(seconds % 60).padStart(2, "0")
    return `${minutes}:${secs}`
  }

  // Start countdown on resend trigger
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [resendTrigger])

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return
    const newCodes = [...codes]
    newCodes[index] = value
    setCodes(newCodes)
    updateData({ resetCode: newCodes.join("") })
    if (errors.resetCode) setErrors((prev) => ({ ...prev, resetCode: "" }))
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const fullCode = codes.join("")
    if (fullCode.length !== 6) {
      newErrors.resetCode = "Please enter the complete 6-digit code"
    }
    if (!data.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (data.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number"
    }
    if (!data.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password"
    } else if (data.newPassword !== data.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: data.resetCode,
          newPassword: data.newPassword,
        }),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success("Password reset successful! Please login.")
        onResetPassword()
      } else {
        setErrors({ general: result.message || "Reset failed. Try again." })
      }
    } catch (error) {
      setErrors({ general: "Server error. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    updateData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      const res = await fetch("/api/auth/send-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success("New OTP sent to your email")

        setCodes(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
        updateData({ resetCode: "" })
        setErrors({})
        setCountdown(240) // Restart 4-minute countdown
        setCanResend(false)
        setResendTrigger((prev) => prev + 1)
      } else {
        toast.error(result.message || "Failed to resend OTP")
      }
    } catch (error) {
      toast.error("Network error. Please try again.")
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="relative mx-auto w-12 h-12 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center z-10 relative">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-md opacity-50" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to <br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      {errors.general && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Code input */}
        <div className="space-y-2">
          <Label className="text-gray-900">Reset Code</Label>
          <div className="flex gap-2 justify-center">
            {codes.map((code, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code}
                onChange={(e) =>
                  handleCodeChange(index, e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold bg-white text-gray-900 border border-gray-300 focus:border-green-500"
                disabled={isLoading}
              />
            ))}
          </div>
          {errors.resetCode && (
            <p className="text-sm text-red-500 text-center">{errors.resetCode}</p>
          )}
        </div>

        {/* Resend */}
        <div className="text-center">
          {canResend ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              className="text-sm text-green-600 hover:underline"
              disabled={resending}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {resending ? "Sending..." : "Resend Code"}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Resend code in <span className="font-semibold">{formatCountdown(countdown)}</span>
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-gray-900">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={data.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              placeholder="Enter new password"
              className={`pr-10 bg-white text-gray-900 ${
                errors.newPassword ? "border-red-500" : "border-gray-300 focus:border-green-500"
              }`}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowNewPassword(!showNewPassword)}
              disabled={isLoading}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmNewPassword" className="text-gray-900">
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmNewPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmNewPassword}
              onChange={(e) =>
                handleInputChange("confirmNewPassword", e.target.value)
              }
              placeholder="Confirm new password"
              className={`pr-10 bg-white text-gray-900 ${
                errors.confirmNewPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-sm text-red-500">{errors.confirmNewPassword}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 border-green-600 text-green-700 hover:bg-green-50"
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  )
}
