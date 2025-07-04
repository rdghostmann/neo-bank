"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Camera, Phone, Mail, CheckCircle, Upload, User, FileText, Shield } from "lucide-react"
import { Layout } from "@/components/DashboardLayout/DashboardLayout"

const steps = [
  { id: 1, title: "Personal Info", icon: User, completed: false },
  { id: 2, title: "Phone Verification", icon: Phone, completed: false },
  { id: 3, title: "Email Verification", icon: Mail, completed: false },
  { id: 4, title: "Document Upload", icon: FileText, completed: false },
  { id: 5, title: "Selfie Verification", icon: Camera, completed: false },
]

export default function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [phoneCode, setPhoneCode] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")

  const progress = (completedSteps.length / steps.length) * 100

  const completeStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter your full address" />
            </div>
            <Button onClick={() => completeStep(1)} className="w-full">
              Continue
            </Button>
          </motion.div>
        )

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="text-center space-y-2">
              <Phone className="w-12 h-12 mx-auto text-blue-600" />
              <h3 className="text-lg font-semibold">Verify Your Phone</h3>
              <p className="text-muted-foreground">We'll send a verification code to your phone number</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {phoneNumber && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <Label htmlFor="phoneCode">Verification Code</Label>
                <Input
                  id="phoneCode"
                  placeholder="Enter 6-digit code"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  maxLength={6}
                />
                <Button onClick={() => completeStep(2)} className="w-full" disabled={phoneCode.length !== 6}>
                  Verify Phone
                </Button>
              </motion.div>
            )}
            {!phoneNumber && (
              <Button onClick={() => setPhoneNumber("+1 (555) 123-4567")} className="w-full">
                Send Code
              </Button>
            )}
          </motion.div>
        )

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="text-center space-y-2">
              <Mail className="w-12 h-12 mx-auto text-green-600" />
              <h3 className="text-lg font-semibold">Verify Your Email</h3>
              <p className="text-muted-foreground">We'll send a verification code to your email address</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {email && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <Label htmlFor="emailCode">Verification Code</Label>
                <Input
                  id="emailCode"
                  placeholder="Enter 6-digit code"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  maxLength={6}
                />
                <Button onClick={() => completeStep(3)} className="w-full" disabled={emailCode.length !== 6}>
                  Verify Email
                </Button>
              </motion.div>
            )}
            {!email && (
              <Button onClick={() => setEmail("user@example.com")} className="w-full">
                Send Code
              </Button>
            )}
          </motion.div>
        )

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="text-center space-y-2">
              <FileText className="w-12 h-12 mx-auto text-purple-600" />
              <h3 className="text-lg font-semibold">Upload Documents</h3>
              <p className="text-muted-foreground">Please upload a government-issued ID</p>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop your ID or click to browse</p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">Accepted formats: JPG, PNG, PDF (max 5MB)</div>
            </div>
            <Button onClick={() => completeStep(4)} className="w-full">
              Upload Document
            </Button>
          </motion.div>
        )

      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="text-center space-y-2">
              <Camera className="w-12 h-12 mx-auto text-orange-600" />
              <h3 className="text-lg font-semibold">Take a Selfie</h3>
              <p className="text-muted-foreground">Take a clear photo of yourself for identity verification</p>
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Camera preview</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              <Button variant="outline" className="w-full">
                Upload from Gallery
              </Button>
            </div>
            <Button onClick={() => completeStep(5)} className="w-full">
              Complete Verification
            </Button>
          </motion.div>
        )

      default:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
            <h3 className="text-xl font-semibold">Verification Complete!</h3>
            <p className="text-muted-foreground">
              Your account has been successfully verified. You can now access all banking features.
            </p>
            <Button className="w-full">Go to Dashboard</Button>
          </motion.div>
        )
    }
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <Layout isAdmin>
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">KYC Verification</h1>
          </div>
          <p className="text-muted-foreground">Complete your identity verification to unlock all features</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between mb-8"
        >
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  completedSteps.includes(step.id)
                    ? "bg-green-600 border-green-600 text-white"
                    : currentStep === step.id
                      ? "border-blue-600 text-blue-600"
                      : "border-muted-foreground/25 text-muted-foreground"
                }`}
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs mt-1 text-center hidden md:block">{step.title}</span>
            </div>
          ))}
        </motion.div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStepData?.icon && <currentStepData.icon className="w-5 h-5" />}
              Step {currentStep}: {currentStepData?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
          </CardContent>
        </Card>

        {/* Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Button variant="link" className="p-0 h-auto">
              Contact Support
            </Button>
          </p>
        </motion.div>
      </div>
    </Layout>
  )
}
