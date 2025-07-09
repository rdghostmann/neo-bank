"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Plus, Camera, CheckCircle, DollarSign, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const DepositAction = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    depositType: "",
    amount: "",
    checkFront: null,
    checkBack: null,
    accountFrom: "",
    description: "",
  })
  const [errors, setErrors] = useState({})

  const depositTypes = [
    { value: "check", label: "Mobile Check Deposit", icon: Camera, description: "Deposit checks using your camera" },
    { value: "transfer", label: "External Transfer", icon: CreditCard, description: "Transfer from another bank" },
    { value: "cash", label: "Cash Deposit", icon: Plus, description: "Deposit cash at ATM or branch" },
  ]

  const externalAccounts = [
    "Chase Checking ••••1234",
    "Wells Fargo Savings ••••5678",
    "Bank of America ••••9012",
    "Add New Account",
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
      if (!formData.depositType) newErrors.depositType = "Please select a deposit type"
    }

    if (step === 2) {
      if (!formData.amount.trim()) newErrors.amount = "Amount is required"
      if (parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0"
      if (parseFloat(formData.amount) > 25000) newErrors.amount = "Amount cannot exceed $25,000"

      if (formData.depositType === "check") {
        if (!formData.checkFront) newErrors.checkFront = "Front of check is required"
        if (!formData.checkBack) newErrors.checkBack = "Back of check is required"
      }

      if (formData.depositType === "transfer") {
        if (!formData.accountFrom) newErrors.accountFrom = "Please select source account"
      }
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

  const handleFileUpload = (field, event) => {
    const file = event.target.files?.[0]
    if (file) {
      handleInputChange(field, file)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const reference = `DEP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    console.log("Deposit submitted:", { ...formData, reference, timestamp: new Date().toISOString() })

    setIsLoading(false)
    setCurrentStep(3)
  }

  const formatAmount = (amount) => {
    const num = parseFloat(amount)
    return isNaN(num) ? "$0.00" : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Make a Deposit</h2>
              <p className="text-gray-600">Choose how you'd like to deposit money</p>
            </div>

            <div className="space-y-3">
              {depositTypes.map((type) => (
                <div
                  key={type.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.depositType === type.value
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleInputChange("depositType", type.value)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                      {formData.depositType === type.value && <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {errors.depositType && <p className="text-sm text-red-500">{errors.depositType}</p>}

            <Button onClick={handleNext} className="w-full">Continue</Button>
          </motion.div>
        )

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Deposit Details</h2>
              <p className="text-gray-600">Enter the deposit amount and details</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Deposit Amount (USD) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="25000"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    placeholder="0.00"
                    className={`pl-10 text-lg font-semibold ${errors.amount ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
                <p className="text-sm text-gray-500 mt-1">Daily limit: $25,000</p>
              </div>

              {formData.depositType === "check" && (
                <>
                  <div>
                    <Label>Front of Check *</Label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-2">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {formData.checkFront ? formData.checkFront.name : "Take photo of check front"}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("checkFront", e)}
                      />
                    </label>
                    {errors.checkFront && <p className="text-sm text-red-500 mt-1">{errors.checkFront}</p>}
                  </div>

                  <div>
                    <Label>Back of Check *</Label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-2">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {formData.checkBack ? formData.checkBack.name : "Take photo of check back"}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("checkBack", e)}
                      />
                    </label>
                    {errors.checkBack && <p className="text-sm text-red-500 mt-1">{errors.checkBack}</p>}
                  </div>
                </>
              )}

              {formData.depositType === "transfer" && (
                <div>
                  <Label>Transfer From *</Label>
                  <Select
                    value={formData.accountFrom}
                    onValueChange={(value) => handleInputChange("accountFrom", value)}
                  >
                    <SelectTrigger className={errors.accountFrom ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {externalAccounts.map((account) => (
                        <SelectItem key={account} value={account}>
                          {account}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.accountFrom && <p className="text-sm text-red-500 mt-1">{errors.accountFrom}</p>}
                </div>
              )}

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="What's this deposit for?"
                  maxLength={50}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.description.length}/50 characters</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">Back</Button>
              <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Submit Deposit"
                )}
              </Button>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Deposit Submitted!</h2>
              <p className="text-gray-600">Your deposit is being processed</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">{formatAmount(formData.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">
                      {depositTypes.find((t) => t.value === formData.depositType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-sm">
                      DEP-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className="bg-yellow-500">Processing</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={() => {
                setCurrentStep(1)
                setFormData({
                  depositType: "",
                  amount: "",
                  checkFront: null,
                  checkBack: null,
                  accountFrom: "",
                  description: "",
                })
              }} className="w-full">Make Another Deposit</Button>
              <Button variant="outline" className="w-full bg-transparent">View Transaction History</Button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        {currentStep > 1 && currentStep < 3 && (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-gray-900">Deposit Money</h1>
        </div>
        <div className="w-16" />
      </div>

      {currentStep < 3 && (
        <div className="flex items-center justify-center mb-6">
          {[1, 2].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {step}
              </div>
              {step < 2 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-green-600" : "bg-gray-200"}`} />}
            </React.Fragment>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  )
}

export default DepositAction
