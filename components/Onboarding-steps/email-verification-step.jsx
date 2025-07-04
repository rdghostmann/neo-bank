"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, RotateCcw } from "lucide-react"
import { toast } from "sonner"

export default function EmailVerificationStep({ data, updateData, onNext, email, onVerifyOtp }) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const [countdown, setCountdown] = useState(240)
  const inputRefs = useRef([])
  const timerRef = useRef(null)
  const [codes, setCodes] = useState(["", "", "", "", "", ""])

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }

  const startCountdown = () => {
    clearInterval(timerRef.current)
    setCountdown(240)
    setCanResend(false)
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    startCountdown()
    return () => clearInterval(timerRef.current)
  }, [email])

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return
    const newCodes = [...codes]
    newCodes[index] = value
    setCodes(newCodes)

    const fullCode = newCodes.join("")
    updateData({ verificationCode: fullCode })

    if (error) setError("")
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullCode = codes.join("")
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    const ok = await onVerifyOtp(fullCode)
    if (ok) {
      onNext()
    } else {
      setError("Invalid or expired verification code. Please try again.")
    }

    setIsLoading(false)
  }

  const handleResend = async () => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const result = await res.json()

      if (!result.success) {
        setError(result.message || "Failed to resend code.")
        toast.error(result.message || "Failed to resend code.")
      } else {
        toast.success("A new verification code has been sent to your email.")
        setCodes(["", "", "", "", "", ""])
        setError("")
        startCountdown()
      }
    } catch (err) {
      setError("Failed to resend code. Please try again.")
      toast.error("Failed to resend code. Please try again.")
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
        <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to <br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Verification Code</Label>
          <div className="flex gap-2 justify-center">
            {codes.map((code, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code}
                onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold bg-white text-gray-900 border border-gray-300"
                disabled={isLoading}
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>

        <div className="text-center">
          {canResend ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              className="text-sm text-green-600 hover:underline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resend Code
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">Resend code in {formatTime(countdown)}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </Button>
      </form>
    </div>
  )
}
