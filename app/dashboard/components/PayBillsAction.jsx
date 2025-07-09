"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Wifi, CheckCircle, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const PayBillsAction = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    billType: "",
    provider: "",
    accountNumber: "",
    amount: "",
    dueDate: "",
    paymentDate: "",
    pin: "",
  })
  const [errors, setErrors] = useState({})

  const billTypes = [
    { value: "utilities", label: "Utilities", icon: "⚡", providers: ["ConEd", "National Grid", "PSEG", "Other"] },
    { value: "internet", label: "Internet/Cable", icon: "📡", providers: ["Verizon", "Comcast", "Spectrum", "Other"] },
    { value: "phone", label: "Phone", icon: "📱", providers: ["Verizon", "AT&T", "T-Mobile", "Other"] },
    { value: "credit", label: "Credit Card", icon: "💳", providers: ["Chase", "Amex", "Capital One", "Other"] },
    { value: "insurance", label: "Insurance", icon: "🛡️", providers: ["Geico", "State Farm", "Allstate", "Other"] },
    {
      value: "loan",
      label: "Loan/Mortgage",
      icon: "🏠",
      providers: ["Wells Fargo", "Chase", "Bank of America", "Other"],
    },
  ]

  const recentBills = [
    { provider: "ConEd", type: "Utilities", amount: "$125.50", due: "2024-02-15", account: "••••5678" },
    { provider: "Verizon", type: "Phone", amount: "$89.99", due: "2024-02-18", account: "••••1234" },
    { provider: "Chase", type: "Credit Card", amount: "$450.00", due: "2024-02-20", account: "••••9012" },
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
      if (!formData.billType) newErrors.billType = "Please select a bill type"
      if (!formData.provider) newErrors.provider = "Please select a provider"
      if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required"
    }

    if (step === 2) {
      if (!formData.amount.trim()) newErrors.amount = "Amount is required"
      if (Number.parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0"
      if (Number.parseFloat(formData.amount) > 10000) newErrors.amount = "Amount cannot exceed $10,000"
      if (!formData.paymentDate) newErrors.paymentDate = "Payment date is required"
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

    const reference = `BILL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    console.log("Bill payment submitted:", { ...formData, reference, timestamp: new Date().toISOString() })

    setIsLoading(false)
    setCurrentStep(4)
  }

  const formatAmount = (amount) => {
    const num = Number.parseFloat(amount)
    return isNaN(num) ? "$0.00" : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
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
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Pay Bills</h2>
              <p className="text-gray-600">Select the bill you want to pay</p>
            </div>

            {/* Recent Bills */}
            <div>
              <Label>Recent Bills</Label>
              <div className="space-y-2 mt-2">
                {recentBills.map((bill, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 cursor-pointer hover:border-orange-300 transition-all"
                    onClick={() => {
                      const billType = billTypes.find((t) => t.label === bill.type)
                      if (billType) {
                        handleInputChange("billType", billType.value)
                        handleInputChange("provider", bill.provider)
                        handleInputChange("accountNumber", bill.account)
                        handleInputChange("amount", bill.amount.replace("$", ""))
                        handleInputChange("dueDate", bill.due)
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{billTypes.find((t) => t.label === bill.type)?.icon || "📄"}</div>
                        <div>
                          <p className="font-medium text-gray-900">{bill.provider}</p>
                          <p className="text-sm text-gray-500">
                            {bill.type} • {bill.account}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{bill.amount}</p>
                        <p className="text-sm text-gray-500">Due {formatDate(bill.due)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">Or add a new bill</p>
            </div>

            {/* Bill Type Selection */}
            <div>
              <Label>Bill Type *</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {billTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      formData.billType === type.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleInputChange("billType", type.value)}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <p className="text-sm font-medium text-gray-900">{type.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              {errors.billType && <p className="text-sm text-red-500 mt-1">{errors.billType}</p>}
            </div>

            {formData.billType && (
              <>
                <div>
                  <Label>Provider *</Label>
                  <Select value={formData.provider} onValueChange={(value) => handleInputChange("provider", value)}>
                    <SelectTrigger className={errors.provider ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {billTypes
                        .find((t) => t.value === formData.billType)
                        ?.providers.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.provider && <p className="text-sm text-red-500 mt-1">{errors.provider}</p>}
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    placeholder="Enter your account number"
                    className={errors.accountNumber ? "border-red-500" : ""}
                  />
                  {errors.accountNumber && <p className="text-sm text-red-500 mt-1">{errors.accountNumber}</p>}
                </div>
              </>
            )}

            <Button onClick={handleNext} className="w-full" disabled={!formData.billType || !formData.provider}>
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
              <p className="text-gray-600">Enter the payment amount and date</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Payment Amount (USD) *</Label>
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
                <p className="text-sm text-gray-500 mt-1">Maximum: $10,000 per transaction</p>
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date (Optional)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">When is this bill due?</p>
              </div>

              <div>
                <Label htmlFor="paymentDate">Payment Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                    min={getTodayDate()}
                    className={`pl-10 ${errors.paymentDate ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.paymentDate && <p className="text-sm text-red-500 mt-1">{errors.paymentDate}</p>}
                <p className="text-sm text-gray-500 mt-1">When do you want to make this payment?</p>
              </div>

              {/* Quick Payment Options */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange("paymentDate", getTodayDate())}
                  className="bg-transparent"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    handleInputChange("paymentDate", tomorrow.toISOString().split("T")[0])
                  }}
                  className="bg-transparent"
                >
                  Tomorrow
                </Button>
                {formData.dueDate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("paymentDate", formData.dueDate)}
                    className="bg-transparent"
                  >
                    Due Date
                  </Button>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Review Payment
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
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Confirm Payment</h2>
              <p className="text-gray-600">Review your bill payment details</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paying to:</span>
                    <div className="text-right">
                      <p className="font-medium">{formData.provider}</p>
                      <p className="text-sm text-gray-500">
                        {billTypes.find((t) => t.value === formData.billType)?.label} • ••••
                        {formData.accountNumber.slice(-4)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-lg">{formatAmount(formData.amount)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-medium">{formatDate(formData.paymentDate)}</span>
                  </div>

                  {formData.dueDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{formatDate(formData.dueDate)}</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">{formatAmount(formData.amount)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label htmlFor="pin">Enter your 4-digit PIN to confirm *</Label>
              <Input
                id="pin"
                type="password"
                value={formData.pin}
                onChange={(e) => handleInputChange("pin", e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="••••"
                maxLength={4}
                className={`text-center text-lg tracking-widest ${errors.pin ? "border-red-500" : ""}`}
              />
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
                  "Pay Bill"
                )}
              </Button>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Scheduled!</h2>
              <p className="text-gray-600">Your bill payment has been scheduled successfully</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">{formatAmount(formData.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{formData.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-medium">{formatDate(formData.paymentDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-sm">
                      BILL-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className="bg-blue-500">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setCurrentStep(1)
                  setFormData({
                    billType: "",
                    provider: "",
                    accountNumber: "",
                    amount: "",
                    dueDate: "",
                    paymentDate: "",
                    pin: "",
                  })
                }}
                className="w-full"
              >
                Pay Another Bill
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Scheduled Payments
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
        {currentStep > 1 && currentStep < 4 && (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-gray-900">Pay Bills</h1>
        </div>
        <div className="w-16" />
      </div>

      {/* Progress Steps */}
      {currentStep < 4 && (
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-orange-600" : "bg-gray-200"}`} />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  )
}

export default PayBillsAction