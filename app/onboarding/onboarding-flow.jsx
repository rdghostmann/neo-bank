"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import BasicIdentityStep from "@/components/Onboarding-steps/basic-identity-step";
import EmailEntryStep from "@/components/Onboarding-steps/email-entry-step";
import EmailVerificationStep from "@/components/Onboarding-steps/email-verification-step";
import AccountDetailsStep from "@/components/Onboarding-steps/account-details-step";
import SecuritySetupStep from "@/components/Onboarding-steps/security-setup-step";

const initialData = {
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  email: "",
  verificationCode: "",
  country: "",
  accountType: "",
  transactionPin: "",
  password: "",
  confirmPassword: "",
};

export default function OnboardingFlow() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleEmailSent = () => {
    setIsEmailSent(true);
    nextStep();
  };

  // Handle redirect to login after successful registration
  useEffect(() => {
    if (pendingApproval) {
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 500); // show toast first
      return () => clearTimeout(timeout);
    }
  }, [pendingApproval, router]);

  const handleCreateAccount = async () => {
    setIsSubmitting(true);
    toast.dismiss();
    try {
      const payload = {
        legalFirstName: formData.firstName,
        middleName: formData.middleName,
        legalLastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        country: formData.country,
        accountType: formData.accountType,
        transactionPin: formData.transactionPin,
        password: formData.password,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || "Registration failed.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Registration successful! Redirecting to login.");
      setPendingApproval(true);
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    toast.dismiss();
    try {
      const res = await fetch("/api/auth/verify-otp-temp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || "OTP verification failed.");
        return false;
      }
      toast.success("Email verified!");
      return true;
    } catch (err) {
      toast.error("OTP verification failed.");
      return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicIdentityStep data={formData} updateData={updateFormData} onNext={nextStep} />;
      case 2:
        return <EmailEntryStep data={formData} updateData={updateFormData} onEmailSent={handleEmailSent} />;
      case 3:
        return (
          <EmailVerificationStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            email={formData.email}
            onVerifyOtp={handleVerifyOtp}
          />
        );
      case 4:
        return (
          <AccountDetailsStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <SecuritySetupStep
            data={formData}
            updateData={updateFormData}
            onBack={prevStep}
            onCreateAccount={handleCreateAccount}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span className="text-black">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-black">{Math.round(progress)}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-green-100 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-emerald-500"
            />
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
