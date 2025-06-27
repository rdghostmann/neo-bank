"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, RotateCcw } from "lucide-react"

export default function TwoFactorStep({ data, updateData, onVerify, onBack, email }) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const inputRefs = useRef([])
  const [codes, setCodes] = useState(["", "", "", "", "", ""])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return

    const newCodes = [...codes]
    newCodes[index] = value
    setCodes(newCodes)

    const fullCode = newCodes.join("")
    updateData({ twoFactorCode: fullCode })

    if (error) setError("")

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
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

    try {
      await onVerify(fullCode)
    } catch (err) {
      setError("Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setCanResend(false)
    setCountdown(30)
    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Two-factor authentication</h1>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to <br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Authentication Code</Label>
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
                className="w-12 h-12 text-center text-lg font-semibold bg-white text-gray-900"
                disabled={isLoading}
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>

        <div className="text-center">
          {canResend ? (
            <Button type="button" variant="ghost" onClick={handleResend} className="text-sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Resend Code
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">Resend code in {countdown}s</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 bg-transparent"
            disabled={isLoading}
          >
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify & Sign In"}
          </Button>
        </div>
      </form>
    </div>
  )
}
