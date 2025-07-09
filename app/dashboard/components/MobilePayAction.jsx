"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Smartphone, QrCode, Users, CheckCircle, DollarSign, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const MobilePayAction = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    paymentType: "",
    recipient: "",
    amount: "",
    description: "",
    pin: "",
  })
  const [errors, setErrors] = useState({})

  const paymentTypes = [
    {
      value: "phone",
      label: "Send to Phone Number",
      icon: Smartphone,
      description: "Send money using phone number",
    },
    {
      value: "qr",
      label: "Scan QR Code",
      icon: QrCode,
      description: "Scan recipient's QR code to pay",
    },
    {
      value: "contacts",
      label: "Pay from Contacts",
      icon: Users,
      description: "Choose from your saved contacts",
    },
  ]

  const recentContacts = [
    { name: "John Smith", phone: "+1 (555) 123-4567", avatar: "👨" },
    { name: "Sarah Wilson", phone: "+1 (555) 987-6543", avatar: "👩" },
    { name: "Mike Johnson", phone: "+1 (555) 456-7890", avatar: "👨‍💼" },
    { name: "Lisa Davis", phone: "+1 (555) 321-0987", avatar: "👩‍💻" },
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
      if (!formData.paymentType) newErrors.paymentType = "Please select a payment method"
      if (formData.paymentType === "phone" && !formData.recipient.trim()) {
        newErrors.recipient = "Phone number is required"
      }
      if (formData.paymentType === "phone" && !/^\+?[\d\s\-]{10,}$/.test(formData.recipient)) {
        newErrors.recipient = "Please enter a valid phone number"
      }
    }

    if (step === 2) {
      if (!formData.amount.trim()) newErrors.amount = "Amount is required"
      if (Number.parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0"
      if (Number.parseFloat(formData.amount) > 5000) newErrors.amount = "Amount cannot exceed $5,000"
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

    const reference = `MP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    console.log("Mobile payment submitted:", { ...formData, reference, timestamp: new Date().toISOString() })

    setIsLoading(false)
    setCurrentStep(4)
  }

  const formatAmount = (amount) => {
    const num = Number.parseFloat(amount)
    return isNaN(num) ? "$0.00" : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
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
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Mobile Payment</h2>
              <p className="text-gray-600">Choose how you'd like to send money</p>
            </div>

            <div className="space-y-3">
              {paymentTypes.map((type) => (
                <div
                  key={type.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.paymentType === type.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleInputChange("paymentType", type.value)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                      {formData.paymentType === type.value && <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.paymentType && <p className="text-sm text-red-500">{errors.paymentType}</p>}

            {formData.paymentType === "phone" && (
              <div>
                <Label htmlFor="recipient">Phone Number *</Label>
                <Input
                  id="recipient"
                  value={formData.recipient}
                  onChange={(e) => handleInputChange("recipient", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={errors.recipient ? "border-red-500" : ""}
                />
                {errors.recipient && <p className="text-sm text-red-500 mt-1">{errors.recipient}</p>}
              </div>
            )}

            {formData.paymentType === "qr" && (
              <div className="text-center py-8">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600">Tap to open camera and scan QR code</p>
              </div>
            )}

            {formData.paymentType === "contacts" && (
              <div>
                <Label>Recent Contacts</Label>
                <div className="space-y-2 mt-2">
                  {recentContacts.map((contact, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        formData.recipient === contact.phone
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleInputChange("recipient", contact.phone)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{contact.avatar}</div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-500">{contact.phone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleNext} className="w-full" disabled={!formData.paymentType}>
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
              <h2 className="text-2xl font-bold text-gray-900">Payment Amount</h2>
              <p className="text-gray-600">Enter the amount to send</p>
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
                    max="5000"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    placeholder="0.00"
                    className={`pl-10 text-lg font-semibold ${errors.amount ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
                <p className="text-sm text-gray-500 mt-1">Daily limit: $5,000</p>
              </div>

              <div>
                <Label htmlFor="description">What's this for? (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Dinner, rent, gift, etc."
                  rows={3}
                  maxLength={100}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.description.length}/100 characters</p>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <Label>Quick Amounts</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["10", "25", "50", "100"].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange("amount", amount)}
                      className="bg-transparent"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
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
              <p className="text-gray-600">Review your payment details</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sending to:</span>
                    <div className="text-right">
                      <p className="font-medium">
                        {formData.paymentType === "contacts"
                          ? recentContacts.find((c) => c.phone === formData.recipient)?.name
                          : "Phone Number"}
                      </p>
                      <p className="text-sm text-gray-500">{formatPhoneNumber(formData.recipient)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-lg">{formatAmount(formData.amount)}</span>
                  </div>

                  {formData.description && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">For:</span>
                      <span className="font-medium text-right max-w-48">{formData.description}</span>
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
                    Sending...
                  </>
                ) : (
                  "Send Payment"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Sent!</h2>
              <p className="text-gray-600">Your mobile payment was successful</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Sent:</span>
                    <span className="font-semibold">{formatAmount(formData.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{formatPhoneNumber(formData.recipient)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-sm">
                      MP-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className="bg-green-500">Completed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setCurrentStep(1)
                  setFormData({
                    paymentType: "",
                    recipient: "",
                    amount: "",
                    description: "",
                    pin: "",
                  })
                }}
                className="w-full"
              >
                Send Another Payment
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Transaction History
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
          <h1 className="text-xl font-bold text-gray-900">Mobile Pay</h1>
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
                  step <= currentStep ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-purple-600" : "bg-gray-200"}`} />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  )
}
export default MobilePayAction