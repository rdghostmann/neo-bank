"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function SecuritySetupStep({ data, updateData, onBack, onCreateAccount }) {
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!data.transactionPin) {
      newErrors.transactionPin = "Transaction PIN is required"
    } else if (data.transactionPin.length !== 4) {
      newErrors.transactionPin = "PIN must be exactly 4 digits"
    } else if (!/^\d{4}$/.test(data.transactionPin)) {
      newErrors.transactionPin = "PIN must contain only numbers"
    }

    if (!data.password) {
      newErrors.password = "Password is required"
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        await onCreateAccount()
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleInputChange = (field, value) => {
    updateData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePinChange = (value) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 4)
    handleInputChange("transactionPin", numericValue)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="relative mx-auto w-12 h-12 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center z-10 relative">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-md opacity-50" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Set your security</h1>
        <p className="text-muted-foreground">Create your login credentials to secure your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PIN */}
        <div className="space-y-2">
          <Label htmlFor="transactionPin">4-digit Transaction PIN *</Label>
          <Input
            id="transactionPin"
            type="text"
            inputMode="numeric"
            value={data.transactionPin}
            onChange={(e) => handlePinChange(e.target.value)}
            placeholder="Enter 4-digit PIN"
            maxLength={4}
            className={`text-center text-lg tracking-widest bg-white text-gray-900 ${
              errors.transactionPin ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.transactionPin && <p className="text-sm text-red-500">{errors.transactionPin}</p>}
          <p className="text-xs text-muted-foreground">Used for transaction verification</p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Create a strong password"
              className={`bg-white text-gray-900 pr-10 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder="Confirm your password"
              className={`bg-white text-gray-900 pr-10 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          {/* <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 bg-transparent"
            disabled={isLoading}
          >
            Back
          </Button> */}
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:opacity-90"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  )
}
