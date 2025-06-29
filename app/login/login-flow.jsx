"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import TwoFactorStep from "@/components/login-steps/two-factor-step";
import ResetPasswordStep from "@/components/login-steps/reset-password-step";
import ForgotPasswordStep from "@/components/login-steps/forgot-password-step";
import LoginStep from "@/components/login-steps/login-step";
import { toast } from "sonner";

const initialData = {
  email: "",
  password: "",
  rememberMe: false,
  resetEmail: "",
  resetCode: "",
  newPassword: "",
  confirmNewPassword: "",
  twoFactorCode: "",
};

export default function LoginFlow() {
  const [currentStep, setCurrentStep] = useState("login");
  const [formData, setFormData] = useState(initialData);
  const [userEmail, setUserEmail] = useState("");

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleForgotPassword = async (email) => {
    setUserEmail(email);
    updateFormData({ resetEmail: email });
    setCurrentStep("reset-password");
  };

  const handleResetPassword = async () => {
    toast("Password reset successful! Please login with your new password.");
    setCurrentStep("login");
  };

  const handleTwoFactor = async (code) => {
    toast("Login successful! Redirecting to dashboard...");
  };

  const renderStep = () => {
    switch (currentStep) {
      case "login":
        return (
          <LoginStep
            data={formData}
            updateData={updateFormData}
            onForgotPassword={() => setCurrentStep("forgot-password")}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordStep
            data={formData}
            updateData={updateFormData}
            onSendReset={handleForgotPassword}
            onBack={() => setCurrentStep("login")}
          />
        );
      case "reset-password":
        return (
          <ResetPasswordStep
            data={formData}
            updateData={updateFormData}
            onResetPassword={handleResetPassword}
            onBack={() => setCurrentStep("forgot-password")}
            email={userEmail}
          />
        );
      case "two-factor":
        return (
          <TwoFactorStep
            data={formData}
            updateData={updateFormData}
            onVerify={handleTwoFactor}
            onBack={() => setCurrentStep("login")}
            email={userEmail}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur-lg opacity-30" />
            </div>
          </div>
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