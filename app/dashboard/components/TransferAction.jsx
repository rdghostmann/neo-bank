"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Send, User, DollarSign, Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const TransferAction = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPin, setShowPin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipientName: "",
    accountNumber: "",
    bankName: "",
    routingNumber: "",
    amount: "",
    transferType: "",
    description: "",
    pin: "",
  })

  const [errors, setErrors] = useState({})

  const banks = [
    "Chase Bank",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
    "US Bank",
    "PNC Bank",
    "Capital One",
    "TD Bank",
    "Other",
  ]

  const transferTypes = [
    { value: "standard", label: "Standard Transfer (1-3 business days)", fee: "Free" },
    { value: "express", label: "Express Transfer (Same day)", fee: "$5.00" },
    { value: "instant", label: "Instant Transfer (Within minutes)", fee: "$10.00" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.recipientName.trim()) newErrors.recipientName = "Recipient name is required"
      if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required"
      if (formData.accountNumber.length < 8) newErrors.accountNumber = "Account number must be at least 8 digits"
      if (!formData.bankName) newErrors.bankName = "Please select a bank"
      if (!formData.routingNumber.trim()) newErrors.routingNumber = "Routing number is required"
      if (formData.routingNumber.length !== 9) newErrors.routingNumber = "Routing number must be 9 digits"
    }

    if (step === 2) {
      if (!formData.amount.trim()) newErrors.amount = "Amount is required"
      if (Number.parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0"
      if (Number.parseFloat(formData.amount) > 10000) newErrors.amount = "Amount cannot exceed $10,000"
      if (!formData.transferType) newErrors.transferType = "Please select transfer type"
    }

    if (step === 3) {
      if (!formData.pin.trim()) newErrors.pin = "PIN is required"
      if (formData.pin.length !== 4) newErrors.pin = "PIN must be 4 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store transfer data in localStorage for IMF verification
    const transferData = {
      ...formData,
      reference: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: "pending_imf",
    }

    localStorage.setItem("pendingTransfer", JSON.stringify(transferData))

    setIsLoading(false)

    // Close modal and redirect to IMF verification
    if (onClose) onClose()
    window.location.href = "dashboard/imf-verification" 
  }

  const formatAmount = (amount) => {
    const num = Number.parseFloat(amount)
    return isNaN(num) ? "$0.00" : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  const getTransferFee = () => {
    const type = transferTypes.find((t) => t.value === formData.transferType)
    return type?.fee || "Free"
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recipient Details</h2>
              <p className="text-gray-600">Enter the recipient's banking information</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange("recipientName", e.target.value)}
                  placeholder="Enter full name as it appears on account"
                  className={errors.recipientName ? "border-red-500" : ""}
                />
                {errors.recipientName && <p className="text-sm text-red-500 mt-1">{errors.recipientName}</p>}
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter account number"
                  maxLength={17}
                  className={errors.accountNumber ? "border-red-500" : ""}
                />
                {errors.accountNumber && <p className="text-sm text-red-500 mt-1">{errors.accountNumber}</p>}
              </div>

              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select value={formData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                  <SelectTrigger className={errors.bankName ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select recipient's bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bankName && <p className="text-sm text-red-500 mt-1">{errors.bankName}</p>}
              </div>

              <div>
                <Label htmlFor="routingNumber">Routing Number *</Label>
                <Input
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={(e) => handleInputChange("routingNumber", e.target.value.replace(/\D/g, ""))}
                  placeholder="9-digit routing number"
                  maxLength={9}
                  className={errors.routingNumber ? "border-red-500" : ""}
                />
                {errors.routingNumber && <p className="text-sm text-red-500 mt-1">{errors.routingNumber}</p>}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Continue
            </Button>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Transfer Amount</h2>
              <p className="text-gray-600">Specify the amount and transfer details</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (USD) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="10000"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    placeholder="0.00"
                    className={`pl-10 text-lg font-semibold ${errors.amount ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
                <p className="text-sm text-gray-500 mt-1">Daily limit: $10,000</p>
              </div>

              <div>
                <Label>Transfer Speed *</Label>
                <div className="space-y-2 mt-2">
                  {transferTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.transferType === type.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleInputChange("transferType", type.value)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{type.label}</p>
                        </div>
                        <Badge variant={type.fee === "Free" ? "secondary" : "outline"}>{type.fee}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.transferType && <p className="text-sm text-red-500 mt-1">{errors.transferType}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="What's this transfer for?"
                  rows={3}
                  maxLength={100}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.description.length}/100 characters</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Review Transfer
              </Button>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Review & Confirm</h2>
              <p className="text-gray-600">Please review your transfer details</p>
            </div>

            {/* Transfer Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <div className="text-right">
                    <p className="font-medium">{formData.recipientName}</p>
                    <p className="text-sm text-gray-500">
                      {formData.bankName} •••• {formData.accountNumber.slice(-4)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-lg">{formatAmount(formData.amount)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Transfer Fee:</span>
                  <span className="font-medium">{getTransferFee()}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">
                      {formatAmount(
                        (
                          Number.parseFloat(formData.amount) +
                          (getTransferFee() === "Free" ? 0 : Number.parseFloat(getTransferFee().replace("$", "")))
                        ).toString(),
                      )}
                    </span>
                  </div>
                </div>

                {formData.description && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium text-right max-w-48">{formData.description}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* PIN Input */}
            <div>
              <Label htmlFor="pin">Enter your 4-digit PIN to confirm *</Label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  value={formData.pin}
                  onChange={(e) => handleInputChange("pin", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="••••"
                  maxLength={4}
                  className={`text-center text-lg tracking-widest ${errors.pin ? "border-red-500" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.pin && <p className="text-sm text-red-500 mt-1">{errors.pin}</p>}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent" disabled={isLoading}>
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Transfer
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {currentStep > 1 && (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-gray-900">Bank Transfer</h1>
        </div>
        <div className="w-16" />
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-6">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            {step < 3 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  )
}

export default TransferAction